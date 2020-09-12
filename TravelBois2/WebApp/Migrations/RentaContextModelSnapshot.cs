﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApp.Data;

namespace WebApp.Migrations
{
    [DbContext(typeof(RentaContext))]
    partial class RentaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApp.Models.Kola", b =>
                {
                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(40)");

                    b.Property<byte>("BrojMesta")
                        .HasColumnType("tinyint");

                    b.Property<bool>("BrzaRezervacija")
                        .HasColumnType("bit");

                    b.Property<short>("Cena")
                        .HasColumnType("smallint");

                    b.Property<short>("Godiste")
                        .HasColumnType("smallint");

                    b.Property<string>("NazivRente")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("TipVozila")
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("Naziv");

                    b.ToTable("Kola");
                });

            modelBuilder.Entity("WebApp.Models.Misc.OcenaKola", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Kompanija")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(40)");

                    b.Property<short>("Value")
                        .HasColumnType("smallint");

                    b.HasKey("ID");

                    b.ToTable("OceneKola");
                });

            modelBuilder.Entity("WebApp.Models.Misc.OcenaRente", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(40)");

                    b.Property<short>("Value")
                        .HasColumnType("smallint");

                    b.Property<string>("kompanija")
                        .HasColumnType("nvarchar(40)");

                    b.HasKey("ID");

                    b.ToTable("OceneRente");
                });

            modelBuilder.Entity("WebApp.Models.Misc.Zauzetost", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Do")
                        .HasColumnType("date");

                    b.Property<string>("Kola")
                        .HasColumnType("nvarchar(40)");

                    b.Property<DateTime>("Od")
                        .HasColumnType("date");

                    b.Property<string>("Renta")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("User")
                        .HasColumnType("nvarchar(40)");

                    b.HasKey("ID");

                    b.ToTable("Zauzetost");
                });

            modelBuilder.Entity("WebApp.Models.RentACar", b =>
                {
                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("AdminID")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("BrojOcena")
                        .HasColumnType("int");

                    b.Property<string>("Drzava")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Grad")
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(200)");

                    b.Property<decimal>("ProsecnaOcena")
                        .HasColumnType("decimal(1,1)");

                    b.HasKey("Naziv");

                    b.ToTable("Rente");
                });
#pragma warning restore 612, 618
        }
    }
}
