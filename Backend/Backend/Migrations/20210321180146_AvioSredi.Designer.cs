﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Backend.Migrations
{
    [DbContext(typeof(AviokompanijaContext))]
    [Migration("20210321180146_AvioSredi")]
    partial class AvioSredi
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Backend.Models.Aerodrom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Aviokompanija")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Aerodromi");
                });

            modelBuilder.Entity("Backend.Models.Aviokompanija", b =>
                {
                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Drzava")
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

            modelBuilder.Entity("Backend.Models.BrzaRezervacija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CenaSedista")
                        .HasColumnType("int");

                    b.Property<int>("IdLeta")
                        .HasColumnType("int");

                    b.Property<string>("IdSedista")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("BrzeRezervacije");
                });

            modelBuilder.Entity("Backend.Models.Let", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Aviokompanija")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

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

                    b.HasKey("Id");

                    b.ToTable("Letovi");
                });

            modelBuilder.Entity("Backend.Models.Misc.OcenaAviokompanije", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(40)");

                    b.Property<byte>("Value")
                        .HasColumnType("tinyint");

                    b.Property<string>("kompanija")
                        .HasColumnType("nvarchar(40)");

                    b.HasKey("ID");

                    b.ToTable("OceneAviokompanije");
                });

            modelBuilder.Entity("Backend.Models.Misc.OcenaLeta", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("IdLeta")
                        .HasColumnType("int");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("OceneLeta");
                });

            modelBuilder.Entity("Backend.Models.Pozivnica", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BrojPasosa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CenaSedista")
                        .HasColumnType("int");

                    b.Property<int>("IdLeta")
                        .HasColumnType("int");

                    b.Property<string>("IdSedista")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PozvaoUsername")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Rezervisano")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Pozivnice");
                });

            modelBuilder.Entity("Backend.Models.Presedanje", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LetId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LetId");

                    b.ToTable("Presedanja");
                });

            modelBuilder.Entity("Backend.Models.Sediste", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BrojPasosa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CenaSedista")
                        .HasColumnType("int");

                    b.Property<int>("IdLeta")
                        .HasColumnType("int");

                    b.Property<string>("IdSedista")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Rezervisano")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("SedistaLeta");
                });

            modelBuilder.Entity("Backend.Models.Presedanje", b =>
                {
                    b.HasOne("Backend.Models.Let", null)
                        .WithMany("PresedanjaLeta")
                        .HasForeignKey("LetId");
                });

            modelBuilder.Entity("Backend.Models.Let", b =>
                {
                    b.Navigation("PresedanjaLeta");
                });
#pragma warning restore 612, 618
        }
    }
}
