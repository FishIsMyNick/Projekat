using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Backend.Data;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using Backend.Models;
using Backend.Helpers;
using System.Threading.Tasks;

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            BlobHandler.Init();
            FileHandler.ClearImageDirs();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            //Inject AppSettings
            services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            // In production, the Angular files will be served from this directory

            services.AddDbContext<AviokompanijaContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));
            services.AddDbContext<RentaContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));
            services.AddDbContext<UserContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });


            services.AddDefaultIdentity<ApplicationUser>().AddEntityFrameworkStores<UserContext>();

            //services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            //{
            //    options.User.RequireUniqueEmail = true;
            //})
            //    .AddEntityFrameworkStores<UserContext>()
            //    .AddRoleManager<UserManager<ApplicationUser>>()
            //    .AddDefaultTokenProviders();
            //services.AddIdentity<AvioAdmin, IdentityRole>(options =>
            //{
            //    options.User.RequireUniqueEmail = true;
            //})
            //    .AddEntityFrameworkStores<UserContext>()
            //    .AddRoleManager<UserManager<AvioAdmin>>()
            //    .AddDefaultTokenProviders();
            //services.AddIdentity<RentAdmin, IdentityRole>(options =>
            //{
            //    options.User.RequireUniqueEmail = true;
            //})
            //    .AddEntityFrameworkStores<UserContext>()
            //    .AddRoleManager<UserManager<RentAdmin>>()
            //    .AddDefaultTokenProviders();
            //services.AddIdentity<Admin, IdentityRole>(options =>
            //{
            //    options.User.RequireUniqueEmail = true;
            //})
            //    .AddEntityFrameworkStores<UserContext>()
            //    .AddRoleManager<UserManager<Admin>>()
            //    .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 3;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });

            services.AddCors();

            //JWT Authentication
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.Use(async (ctx, next) =>
            //{
            //    await next();
            //    if (ctx.Response.StatusCode == 204)
            //    {
            //        ctx.Response.ContentLength = 0;
            //    }
            //});

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            ////////////////////////
            app.UseCors(builder =>
            builder.WithOrigins(Configuration["ApplicationSettings:Client_Url"].ToString())
            .AllowAnyHeader()
            .AllowAnyMethod());
            /////////////////////////

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();


            app.UseAuthentication();
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
            //app.UseMvc();
        }
    }
}
