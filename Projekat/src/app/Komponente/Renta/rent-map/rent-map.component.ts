import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MapService } from 'src/app/shared/map.service';
import { SveRenteComponent } from '../sve-rente/sve-rente.component';

declare var ol: any;

@Component({
  selector: 'rent-map',
  templateUrl: './rent-map.component.html'
})

export class RentMapComponent implements OnInit {
  @Input() adresa: string;

  private map: any;


  private lat: number;
  private lon: number;

  constructor(private http: HttpClient, private service: MapService) {
    //console.log("Map constructor")
    //this.ngOnInit();
  }

  async ngOnInit() {
    // console.log("Map onInit")
    // console.log(this.adresa);
    await this.addressLookup(this.adresa);
  }

  async addressLookup(addressArray: string) {
    let addresses = addressArray.split('|');
    //console.log(addresses)
    let latLonArray = new Array<any>();
    for (let i = 0; i < addresses.length; i++) {
      let formatedAddress = addresses[i];
      //console.log(formatedAddress)
      if (formatedAddress.charAt(0) === ",") {
        formatedAddress = formatedAddress.substring(1, formatedAddress.length - 1);
      }
        var split = formatedAddress.split(",", 3);
        var houseNumber = (split[0]).replace(' ', '%20');
        var street = (split[1]).replace(' ', '%20');
        var city = (split[2]).replace(' ', '%20');

        var location = 'street=' + houseNumber + '+' + street + '&city=' + city;
        var search = 'http://nominatim.openstreetmap.org/search?format=json&' + location;

        var latLon = await this.service.GetCoordsFromAddr(search);
        //console.log(latLon)
        latLonArray.push(latLon);
      
      //console.log(formatedAddress);
    }
      this.defineMap(latLonArray);
  }
    defineMap(latLonArray: Array<any>){
      //console.log('define map', latLonArray)
      let longitude = latLonArray[0].lon;
      let latitude = latLonArray[0].lat;
      // console.log("definisanje mape");
      // console.log('x')
      // console.log(ol)
      // console.log('x')
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([longitude - 0.00, latitude - 0.00]),
          zoom: 15
        })
      });
      latLonArray.forEach(e => {
        this.addPoint(e.lat - 0.00, e.lon - 0.00);
      });

      //console.log('kraj def map')
    }
  addPoint(lat: number, lng: number) {
      var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
          })]
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: 'http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png'
          })
        })
      });

      this.map.addLayer(vectorLayer);
    }
  static myFunction(){
      var element = document.getElementById("map");
      console.log(element)
    element.parentNode.removeChild(element);
      var node = document.createElement("div");
      node.setAttribute("id", "map");
      node.setAttribute("style", "height: 400px;");
      var parent = document.getElementById("destory1");
      parent.appendChild(node);
    }

}
