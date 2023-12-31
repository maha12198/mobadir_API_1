using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NuGet.Common;
using NuGet.ProjectModel;
using System.IO;
using System.Net;
using System.Text;
using static System.Net.WebRequestMethods;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RichEditorController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public RichEditorController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("ImageUpload")]
        public async Task<Object> ImageUpload()
        {
            try
            {
                IFormFile file = HttpContext.Request.Form.Files[0];
                string folderPath = "wwwroot/ArticleImages/";

                var baseUrl = Path.Combine(_webHostEnvironment.ContentRootPath,  folderPath);
                
                int total;
                try
                {
                    total = HttpContext.Request.Form.Files.Count;
                }
                catch (Exception ex)
                {
                    return await Task.FromResult(new { error = new { message = "Error Uploading file" } });
                }

                if (total == 0)
                {
                    return await Task.FromResult(new { error = new { message = "No file has sent" } });
                }
                if (!Directory.Exists(baseUrl)) 
                {
                    return await Task.FromResult(new { error = new { message = "Folder does not exist" } });
                }
                string fileName = file.FileName;
                if(fileName =="")
                {
                    return await Task.FromResult(new { error = new { message = "Error Uploading file" } });
                }
                string newFileName = Guid.NewGuid().ToString()+Path.GetExtension(fileName);
                string newPath = baseUrl + newFileName;
                using (var stream = System.IO.File.OpenWrite(newPath))
                {
                    await file.CopyToAsync(stream);
                }
                string imageUrl = "https://localhost:7199/ArticleImages/" + newFileName;

                return await Task.FromResult(new {url = imageUrl});
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in an appropriate way
                return BadRequest(new { Message = "Image upload failed", Error = ex.Message });
            }
        }

        [HttpPost("ImageUpload_1")]
        public async Task<Object> ImageUpload_1()
        {
            try
            {
                IFormFile file = HttpContext.Request.Form.Files[0];

                string newFileName = Guid.NewGuid().ToString() + file.FileName;

                string ftpUrl = "ftp://win5143.site4now.net/mobader/wwwroot/uploads/" + newFileName;

                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpUrl);

                request.Credentials = new NetworkCredential("ahamdycs2012-001", "Ahmed123#");

                request.Method = WebRequestMethods.Ftp.UploadFile;
                
                request.UsePassive = true;

                var totalBytes = file.Length;
                var uploadedBytes = 0L;

                using (Stream ftpStream = request.GetRequestStream())
                {
                    await file.CopyToAsync(ftpStream);
                    ftpStream.Close();
                }

                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                
                string imageUrl = "http://ahamdycs2012-001-site1.btempurl.com/uploads//" + newFileName;

                // new : fot the file type 
                // Extract file extension from the uploaded file name
                string fileExtension = Path.GetExtension(file.FileName).ToLower();

                return await Task.FromResult(new { url = imageUrl, extension = fileExtension });
                
            }
            catch (WebException ex)
            {
                String status = ((FtpWebResponse)ex.Response).StatusDescription;
                
                // Log the exception or handle it in an appropriate way
                return BadRequest(new { Message = "Image upload failed", Error = ex.Message });
            }
        }
    }


}
