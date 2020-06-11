﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApp.Data;

namespace WebApp.Migrations.Aviokompanija
{
    [DbContext(typeof(AviokompanijaContext))]
    [Migration("20200610100147_IzmenaAviokompanije")]
    partial class IzmenaAviokompanije
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ServerApp.Models.Aviokompanija", b =>
                {
                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Naziv");

                    b.ToTable("Aviokompanije");
                });

            modelBuilder.Entity("ServerApp.Models.Let", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CenaKarte")
                        .HasColumnType("int");

                    b.Property<string>("DatumDolaska")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DatumPolaska")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("KlasaLeta")
                        .HasColumnType("int");

                    b.Property<string>("MestoDolaska")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MestoPolaska")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RazdaljinaPutovanja")
                        .HasColumnType("int");

                    b.Property<int>("TipLeta")
                        .HasColumnType("int");

                    b.Property<int>("TrajanjePutovanja")
                        .HasColumnType("int");

                    b.Property<string>("VremePoletanja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VremeSletanja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aviokompanijaNaziv")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("aviokompanijaNaziv");

                    b.ToTable("Letovi");
                });

            modelBuilder.Entity("WebApp.Models.Aerodrom", b =>
                {
                    b.Property<string>("Grad")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LetId")
                        .HasColumnType("int");

                    b.HasKey("Grad");

                    b.HasIndex("LetId");

                    b.ToTable("Aerodromi");
                });

            modelBuilder.Entity("ServerApp.Models.Let", b =>
                {
                    b.HasOne("ServerApp.Models.Aviokompanija", "aviokompanija")
                        .WithMany()
                        .HasForeignKey("aviokompanijaNaziv");
                });

            modelBuilder.Entity("WebApp.Models.Aerodrom", b =>
                {
                    b.HasOne("ServerApp.Models.Let", null)
                        .WithMany("Presedanja")
                        .HasForeignKey("LetId");
                });
#pragma warning restore 612, 618
        }
    }
}