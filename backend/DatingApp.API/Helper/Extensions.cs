using Microsoft.AspNetCore.Http;

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
    }
}