using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NuGet.Common;
using NuGet.ProjectModel;
using System.Configuration;
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
        //private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IConfiguration _configuration;

        public RichEditorController(IConfiguration configuration)
        {
            //_webHostEnvironment = webHostEnvironment;
            _configuration = configuration;
        }


        [HttpPost("ImageUpload_1")]
        public async Task<Object> ImageUpload_1()
        {
            try
            {
                IFormFile file = HttpContext.Request.Form.Files[0];
                string newFileName = Guid.NewGuid().ToString() + file.FileName;
                string ftpUrl = _configuration["FtpUrl"] + newFileName;

                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpUrl);
                request.Credentials = new NetworkCredential(_configuration["FtpUsername"], _configuration["FtpPassword"]);
                request.Method = Ftp.UploadFile;
                request.UsePassive = true;

                using (Stream ftpStream = request.GetRequestStream())
                {
                    await file.CopyToAsync(ftpStream);
                    ftpStream.Close();
                }

                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                string imageUrl = _configuration["ServerUrl"] + "/uploads//" + newFileName;
                string fileExtension = Path.GetExtension(file.FileName).ToLower(); //Extract file extension from the uploaded file name

                return await Task.FromResult(new { url = imageUrl, extension = fileExtension });
            }
            catch (WebException ex)
            {
                return BadRequest(new { Message = "Image upload failed", Error = ex.Message });
            }
        }




        //[HttpPost("ImageUpload")]
        //public async Task<Object> ImageUpload()
        //{
        //    try
        //    {
        //        IFormFile file = HttpContext.Request.Form.Files[0];
        //        string folderPath = "wwwroot/ArticleImages/";

        //        var baseUrl = Path.Combine(_webHostEnvironment.ContentRootPath,  folderPath);

        //        int total;
        //        try
        //        {
        //            total = HttpContext.Request.Form.Files.Count;
        //        }
        //        catch (Exception ex)
        //        {
        //            return await Task.FromResult(new { error = new { message = "Error Uploading file" } });
        //        }

        //        if (total == 0)
        //        {
        //            return await Task.FromResult(new { error = new { message = "No file has sent" } });
        //        }
        //        if (!Directory.Exists(baseUrl)) 
        //        {
        //            return await Task.FromResult(new { error = new { message = "Folder does not exist" } });
        //        }
        //        string fileName = file.FileName;
        //        if(fileName =="")
        //        {
        //            return await Task.FromResult(new { error = new { message = "Error Uploading file" } });
        //        }
        //        string newFileName = Guid.NewGuid().ToString()+Path.GetExtension(fileName);
        //        string newPath = baseUrl + newFileName;
        //        using (var stream = System.IO.File.OpenWrite(newPath))
        //        {
        //            await file.CopyToAsync(stream);
        //        }
        //        string imageUrl = "https://localhost:7199/ArticleImages/" + newFileName;

        //        return await Task.FromResult(new {url = imageUrl});
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception or handle it in an appropriate way
        //        return BadRequest(new { Message = "Image upload failed", Error = ex.Message });
        //    }
        //}


    }


}
