using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net.Http.Headers;


using HeyRed.Mime;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Produces("application/json")] //to tell ASP.NET that this controller produces JSON responses
    public class UploadController : ControllerBase
    {

        private readonly IWebHostEnvironment _hostingEnvironment;

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        //POST: api/Upload
        // method 
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadFile()
        {
            if (!Request.Form.Files.Any())
                return BadRequest("No files found in the request");

            if (Request.Form.Files.Count > 1)
                return BadRequest("Cannot upload more than one file at a time");

            if (Request.Form.Files[0].Length <= 0)
                return BadRequest("Invalid file length, seems to be empty");

            try // try to uplaod the file to wwwroot folder
            {
                // here i should add the server host link
                string webRootPath = _hostingEnvironment.WebRootPath;
                string uploadsDir = Path.Combine(webRootPath, "uploads");

                // wwwroot/uploads/
                if (!Directory.Exists(uploadsDir))
                    Directory.CreateDirectory(uploadsDir);

                IFormFile file = Request.Form.Files[0];
                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string fullPath = Path.Combine(uploadsDir, fileName);

                var buffer = 1024 * 1024;
                using var stream = new FileStream(fullPath, FileMode.Create, FileAccess.Write, FileShare.None, buffer, useAsync: false);
                await file.CopyToAsync(stream);
                await stream.FlushAsync();

                string location = $"images/{fileName}";

                var result = new
                {
                    message = "Upload successful",
                    url = location
                };

                // returning this
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Upload failed: " + ex.Message);
            }
        }







        [HttpGet]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string file)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, file);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath), file);
        }


        private string GetContentType(string path)
        {
            string contentType = MimeTypesMap.GetMimeType(System.IO.Path.GetExtension(path));
            return contentType ?? "application/octet-stream";

            //var provider = new FileExtensionContentTypeProvider();
            //string contentType;
            //if (!provider.TryGetContentType(path, out contentType))
            //{
            //    contentType = "application/octet-stream";
            //}
            //return contentType;
        }
    }



}

