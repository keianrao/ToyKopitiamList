using System.Data.Odbc;

class
ToyKopitiamListAPI {

    private OdbcConnection
    dbConn;

//  ---%-@-%---

    static string GetAppTime() {
        return DateTime.Now.ToString();
    }

//  ---%-@-%---

    static void Main(string[] args)
    {
        using (OdbcConnection dbConn = LocalDbConnect())
        {
            ToyKopitiamListAPI inst = new(dbConn);

            var webApp = WebApplication.CreateBuilder(args).Build();
            webApp.MapGet("/time", GetAppTime);
            webApp.Run();
        }
    }

    static OdbcConnection LocalDbConnect()
    {
        string driver = "{MySQL ODBC 8.4 Unicode Driver}";
        string server = "localhost";
        string database = "ToyKopitiamList";
        string userId = "Keian";
        string password = "Kopitiam_128";
        // Seriously, try to start using SHA-256 logins or something..

        OdbcConnection returnee = new(
            "DRIVER=" + driver
            + ";SERVER=" + server
            + ";DATABASE=" + database
            + ";UID=" + userId
            + ";PASSWORD=" + password);
        returnee.Open();
        return returnee;
    }

//  ---%-@-%---

    ToyKopitiamListAPI(OdbcConnection dbConn)
    {
        this.dbConn = dbConn;
    }

    void TestDatabaseConnection()
    {
        OdbcCommand command = new(
            "\n SELECT COUNT(*)" +
            "\n FROM Entries;");

        OdbcDataReader reader = command.ExecuteReader();
        reader.Read();
        reader.GetInt64(1);
        reader.Close();
    }

}
