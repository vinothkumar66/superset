# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import logging
from io import BytesIO
from reportlab.lib.pagesizes import A4, A3

from superset.commands.report.exceptions import ReportSchedulePdfFailedError

logger = logging.getLogger(__name__)
# Define sizes for convenience
PAPER_SIZES = {
    "A4": A4,
    "A3": A3,
   
}
try:
    from PIL import Image
except ModuleNotFoundError:
    logger.info("No PIL installation found")

def resize_image_to_paper(image, paper_size):
    """
    Resize the image to fit within the paper size dimensions while maintaining aspect ratio.
    """
    paper_width, paper_height = paper_size
    img_width, img_height = image.size

    # Calculate the scaling factor to fit the image within the paper size
    scale = min(paper_width / img_width, paper_height / img_height)
    
    new_size = (int(img_width * scale), int(img_height * scale))
    resized_image = image.resize(new_size, Image.Resampling.LANCZOS)

    return resized_image

def build_pdf_from_screenshots(snapshots: list[bytes],papersizes ) -> bytes:
    # print("paper_sizes",paper_size)
    images = []

    for snap in snapshots:
        img = Image.open(BytesIO(snap))
        if img.mode == "RGBA":
            img = img.convert("RGB")
         # Resize the image to fit the selected paper size
        if papersizes in PAPER_SIZES:
            img = resize_image_to_paper(img, PAPER_SIZES[papersizes])
        images.append(img)
    logger.info("building pdf")
    try:
        new_pdf = BytesIO()
        images[0].save(new_pdf, "PDF", save_all=True, append_images=images[1:])
        new_pdf.seek(0)
    except Exception as ex:
        raise ReportSchedulePdfFailedError(
            f"Failed converting screenshots to pdf {str(ex)}"
        ) from ex

    return new_pdf.read()
