using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.ViewModel
{
    public class PhotoForCreationViewModel
    {
        public PhotoForCreationViewModel()
        {
            DateAdded = DateTime.Now;
        }
        
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
    }
}