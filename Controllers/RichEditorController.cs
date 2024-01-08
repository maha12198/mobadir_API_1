using Microsoft.AspNetCore.Mvc;
using System.Net;
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

        // ------------------------------------------------ Upload Image in Editor -----------------------------------------
        [HttpPost("Editor_ImageUpload")]
        public async Task<Object> Editor_ImageUpload()
        {
            try
            {
                IFormFile file = HttpContext.Request.Form.Files[0];
                string newFileName = Guid.NewGuid().ToString() + file.FileName;
                string ftpUrl = _configuration["FtpUrl"] + "/uploads/editor_images/" + newFileName;

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
                string imageUrl = _configuration["ServerUrl"] + "/uploads/editor_images/" + newFileName;
                //string fileExtension = Path.GetExtension(file.FileName).ToLower(); //Extract file extension from the uploaded file name

                return await Task.FromResult(new { url = imageUrl });
            }
            catch (WebException ex)
            {
                return BadRequest(new { Message = "Image upload failed", Error = ex.Message });
            }
        }


        // ------------------------------------------------ Upload Image of Question -----------------------------------------
        [HttpPost("Question_ImageUpload")]
        public async Task<Object> Question_ImageUpload()
        {
            try
            {
                IFormFile file = HttpContext.Request.Form.Files[0];
                string newFileName = Guid.NewGuid().ToString() + file.FileName;
                string ftpUrl = _configuration["FtpUrl"] + "/uploads/question_images/" + newFileName;

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
                string imageUrl = _configuration["ServerUrl"] + "/uploads/question_images/" + newFileName;
                //string fileExtension = Path.GetExtension(file.FileName).ToLower(); //Extract file extension from the uploaded file name

                return await Task.FromResult(new { url = imageUrl });
            }
            catch (WebException ex)
            {
                return BadRequest(new { Message = "Image upload failed", Error = ex.Message });
            }
        }

        // ------------------------------------------------ Upload new File -----------------------------------------
        [HttpPost("FileUpload")]
        public async Task<Object> FileUpload()
        {
            try
            {
                IFormFile file = HttpContext.Request.Form.Files[0];
                string newFileName = Guid.NewGuid().ToString() + file.FileName;
                string ftpUrl = _configuration["FtpUrl"] + "/uploads/uploaded_files/" + newFileName;

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
                string imageUrl = _configuration["ServerUrl"] + "/uploads/uploaded_files/" + newFileName;
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
