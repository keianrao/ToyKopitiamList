using System.Data.Odbc;
using System.Text.Json.Nodes;

class
ToyKopitiamListAPI {

    private OdbcConnection
    dbConn;

//  ---%-@-%---

    JsonArray GetAllEntries()
    {
        OdbcCommand command = new(
            "\n SELECT *" +
            "\n FROM Entries;",
            dbConn);

        JsonArray returnee = new();
        using (OdbcDataReader reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                string name = reader.GetString(1);
                string address = reader.GetString(2);
                double latitude = reader.GetDouble(3);
                double longitude = reader.GetDouble(4);
                DateTime dateAdded = reader.GetDateTime(5);

                JsonObject addee = new();
                addee.Add("name", JsonValue.Create(name));
                addee.Add("address", JsonValue.Create(address));
                addee.Add("latitude", JsonValue.Create(latitude));
                addee.Add("longitude", JsonValue.Create(longitude));
                addee.Add("dateAdded", JsonValue.Create(dateAdded));
                returnee.Add(addee);
            }
        }
        return returnee;
    }

//   -  -%-  -

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
            webApp.MapGet("/entries", inst.GetAllEntries);
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
        TestDatabaseConnection();
    }

    void TestDatabaseConnection()
    {
        OdbcCommand command = new(
            "\n SELECT COUNT(*)" +
            "\n FROM Entries;",
            dbConn);

        command.ExecuteScalar();
        // Truly confusingly, compared to like JDBC, if you
        // select simply one scalar value then you have to
        // ask for a scalar execution.
    }

}
