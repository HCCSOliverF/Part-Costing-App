using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IO;

namespace Part_Costing_App.Pages
{
    public class PdfModel : PageModel
    {
        public IActionResult OnPostSavePdfCopy()
        {
            try
            {
                // Directory path to store PDF copies
                string pdfFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "PDFs");

                // Ensure the PDF template exists
                string templateFilePath = Path.Combine(pdfFolderPath, "Part Cost Analysis - Template.pdf");
                if (!System.IO.File.Exists(templateFilePath))
                {
                    return NotFound("Template PDF file not found.");
                }

                // Create folder if not exists
                Directory.CreateDirectory(pdfFolderPath);

                // Generate unique file name using current timestamp
                string fileName = $"PartCostAnalysis_{DateTime.Now.ToString("yyyyMMddHHmmss")}.pdf";

                // Destination file path for the copied PDF
                string destinationFilePath = Path.Combine(pdfFolderPath, fileName);

                // Copy the PDF file to the destination with the unique file name
                System.IO.File.Copy(templateFilePath, destinationFilePath);

                // Return the file path of the copied PDF
                return Content(destinationFilePath);
            }
            catch (Exception ex)
            {
                // Handle exception
                return BadRequest($"Failed to save PDF copy: {ex.Message}");
            }
        }

        /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

        /*        public IActionResult OnPostDeletePdf(string id)
                {
                    try
                    {
                        // File path of the PDF to delete
                        string pdfFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "PDFs", id);

                        // Check if the file exists
                        if (System.IO.File.Exists(pdfFilePath))
                        {
                            // Delete the PDF file
                            System.IO.File.Delete(pdfFilePath);
                            return Ok();
                        }
                        else
                        {
                            // PDF file not found
                            return NotFound("PDF file not found.");
                        }
                    }
                    catch (Exception ex)
                    {
                        // Handle exception
                        return BadRequest($"Failed to delete PDF: {ex.Message}");
                    }
                }*/
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

    public class OpenPartModel : PageModel
    {
        public IActionResult OnGetDownloadPDF()
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "PDfs", "Part Cost Analysis - Template.pdf");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("PDF file not found.");
            }

            return PhysicalFile(filePath, "application/pdf", "Part Cost Analysis - Template.pdf");
        }



        private readonly ILogger<OpenPartModel> _logger;

        public OpenPartModel(ILogger<OpenPartModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}