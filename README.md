**Customer Management System (CMS)**
Overview
The Customer Management System (CMS) is a web application designed to manage customer information. It features user authentication, CRUD operations for customers, and a responsive UI built with React. The backend is powered by ASP.NET Core and uses a SQL Server database.
Prerequisites
Before running the application, ensure you have the following installed:
•	.NET SDK (version 8.0 or higher)
•	Node.js (version 18.0 or higher)
•	SQL Server or SQL Server LocalDB
•	Yarn or npm (for managing JavaScript packages)
Configuration
Backend Configuration
appsettings.Development.json
json
Copy code
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "app-conn": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CMS_DB;Integrated Security=True;Encrypt=False;Trust Server Certificate=True;"
  },
  "JWT": {
    "Key": "4RZhHq/dbW/coiQNA1SBHiEmJclw5nBin7zBqbyLfLQ=4RZhHq/dbW/coiQNA1SBHiEmJclw5nBin7zBqbyLfLQ=",
    "Issure": "SecureApi",
    "Audience": "SecureApiUser",
    "DurationInDays": 30
  }
}
Seed.cs
Use this class to seed initial data into your database:
csharp
Copy code
public class Seed
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new YourDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<YourDbContext>>()))
        {
            // Check if the database is already seeded
            if (context.Customers.Any())
            {
                return; // DB has been seeded
            }

            context.Customers.AddRange(
                new Customer { /* Initialization data here */ }
            );

            context.SaveChanges();
        }
    }
}
**Frontend Configuration**
.env.local
Create a .env.local file in the root of your frontend project and add the following environment variables:
arduino
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5001
Installation
Backend
1.	Clone the repository:
=================
git clone https://github.com/raedalifarhan/customer-management-system.git
2.	Navigate to the backend directory:
=================
cd customer-management-system/API
3.	Restore the dependencies:
=================
dotnet restore
4.	Apply any migrations:
=================
dotnet ef database update
5.	Run the application:
=================
dotnet run
Frontend
1.	Navigate to the frontend directory:
=================
cd customer-management-system/client
2.	Install the dependencies:
=================
yarn install
# or
npm install
3.	Start the development server:

yarn dev
# or
npm run dev
Running the Application
•	The backend will be available at https://localhost:5001/.
•	The frontend will be available at http://localhost:3000/.
Building for Production
Backend
1.	Publish the application:

dotnet publish -c Release
2.	Deploy the contents of the bin/Release/net8.0/publish directory to your production server.
Frontend
1.	Build the production assets:

yarn build
# or
npm run build
2.	Deploy the contents of the .next directory to your production server.
Troubleshooting
•	Database Connection Issues: Ensure your SQL Server instance is running and the connection string in appsettings.Development.json is correct.
•	API Not Responding: Verify that the backend service is running and accessible. Check the logs for any errors.
•	Frontend Build Errors: Ensure all environment variables are set correctly in .env.local and dependencies are properly installed.
Contributing
1.	Fork the repository.
2.	Create a new branch (git checkout -b feature/your-feature).
3.	Commit your changes (git commit -am 'Add new feature').
4.	Push to the branch (git push origin feature/your-feature).
5.	Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments
•	React
•	Next.js
•	ASP.NET Core
•	Flowbite

