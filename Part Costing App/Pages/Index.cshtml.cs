using System;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using static Org.BouncyCastle.Bcpg.Attr.ImageAttrib;

namespace Part_Costing_App.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public Part newPart { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- Upload File -- Upload File -- Upload File -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

        public async Task<IActionResult> Upload(IFormFile fileInput)
        {
            if (fileInput != null && fileInput.Length > 0)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileInput.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await fileInput.CopyToAsync(stream);
                }
            }
            return Page();
        }

        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- Create Part -- Create Part -- Create Part -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

        public IActionResult OnGetCreatePart(string Name, int Units, string Material, string Finish)
        {
            newPart = new Part(long.Parse(DateTime.Now.ToString("yyyyMMddHHmmss"))); // Creates Instance of Part Class (ID)
            Part data = newPart.CalculateData(newPart, Name, Units, Material, Finish);

            return new ObjectResult(data); // Json result make the string returnable in IActionResult
        }


        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- --- Send Part Data to JS (to store it in local storage) --- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


/*        public IActionResult ReturnPartData()
        {
            // Serialize Part object to JSON
            string jsonData = JsonConvert.SerializeObject(newPart);
            _logger.LogInformation("This is the data" + jsonData);
            _logger.LogInformation("   ");
            _logger.LogInformation("This is the data" + new JsonResult(jsonData));

            // Return JSON data
            return new JsonResult(jsonData);
        }*/
    }
}