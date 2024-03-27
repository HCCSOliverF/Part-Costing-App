using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections.Generic;
using Newtonsoft.Json;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Microsoft.AspNetCore.Mvc;

namespace Part_Costing_App
{
    public class Part
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Material { get; set; }
        public string Finish { get; set; }
        public int Units { get; set; }
        public float DiscountPrice { get; set; }
        public float DiscountPercent { get; set; }
        public float PriceBeforeDiscount { get; set; }
        public float Cost { get; set; }
        public List<string> Features { get; set; }

        /*-- -- -- -- -- -- -- -- -- -- -- -- - Instantiator Function - Instantiator Function - -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

        public Part(long id)
        {
            Id = id;
            Features = new List<string>();
        }

        /* -- -- -- -- -- -- -- -- -- -- -- -- -- Calculate Part Data - Calculate Part Data -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

        public Part CalculateData(Part PartClass, string Name, int Units, string Material, string Finish)
        {

            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --*/
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --*/
            /*                                                                                                                           */
            /*                                                                                                                           */
            /*                                                    Calculate Part Data                                                    */
            /*                                                                                                                           */
            /*                                                                                                                           */
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --*/
            /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --*/


            PartClass.Id = Id;//                     -- +
            PartClass.Name = Name;//                    |
            PartClass.Material = Material;//            |
            PartClass.Finish = Finish;//                |
            PartClass.Units = Units;//                  |  Random data entered for the sake of the program
            PartClass.DiscountPrice = 10;//             |
            PartClass.DiscountPercent = 32;//           |
            PartClass.PriceBeforeDiscount = 120;//      |
            PartClass.Cost = 101;//                  -- +

            GeneratePDF(PartClass);
            return PartClass;
        }

        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- Generate PDF - Generate PDF - Generate PDF -- -- -- -- -- -- -- -- -- -- -- -- -- -- - */
        /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

        public void GeneratePDF(Part PartClass)
        {
            string fileName = $"{PartClass.Id}.pdf";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "files", fileName);

            using (FileStream fs = new FileStream(filePath, FileMode.Create))
            {
                Document doc = new Document();
                PdfWriter.GetInstance(doc, fs);
                doc.Open();

                // Use PartClass data to generate PDF
                doc.Add(new Paragraph($"Part Name: {PartClass.Name}"));
                doc.Add(new Paragraph($"Material: {PartClass.Material}"));
                doc.Add(new Paragraph($"Finish: {PartClass.Finish}"));
                doc.Add(new Paragraph($"Units: {PartClass.Units}"));
                doc.Add(new Paragraph($"Discount Price: {PartClass.DiscountPrice}"));
                doc.Add(new Paragraph($"Discount Percent: {PartClass.DiscountPercent}"));
                doc.Add(new Paragraph($"Price Before Discount: {PartClass.PriceBeforeDiscount}"));
                doc.Add(new Paragraph($"Cost: {PartClass.Cost}"));

                doc.Close();
            }
        }
    }
}