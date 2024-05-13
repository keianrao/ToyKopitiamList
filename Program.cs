
static string GetAppTime() {
    return DateTime.Now.ToString();
}

var webApp = WebApplication.CreateBuilder(args).Build();
webApp.MapGet("/time", GetAppTime);
webApp.Run();