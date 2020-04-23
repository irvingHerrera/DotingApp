using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helper
{
    public static class Extensions
    {
        public static void AddAplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Aplication-Error", message);
            response.Headers.Add("Access-Contro-Expose-Headers", "Aplication-Error");
            response.Headers.Add("Access-Contro-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, 
        int curretPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(curretPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");   
        }

        public static int CalculateAge(this DateTime data)
        {
            var age = DateTime.Today.Year - data.Year;
            if(data.AddYears(age) > DateTime.Today) {
                age--;
            }

            return age;
        }
    }
}