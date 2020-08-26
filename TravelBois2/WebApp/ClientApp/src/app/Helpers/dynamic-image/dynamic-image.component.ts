import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter, ElementRef, Inject, PLATFORM_ID, Renderer2, OnDestroy, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { debuglog } from 'util';

@Component({
  selector: 'dynamic-image',
  //
  templateUrl: './dynamic-image.component.html',
  //styles: [':host {display: block;}']
})
export class DynamicImageComponent implements OnInit{
  @Input() klasa: string; // ostaviti prazno za default klasu
  @Input() naziv: string; // slika MORA da se zove isto kao i kompanija i da ima .jpg extenziju
  @Input() tip: string; // ubacen da moze da se udje u odgovarajuci direktorijum
  
  constructor(){
    console.debug('naziv: ' + this.naziv)
    console.debug('tip: ' + this.tip)
  }

  ngOnInit(){
     console.debug('naziv: ' + this.naziv)
     console.debug('tip: ' + this.tip)
    // console.debug('klasa:' + this.klasa)
  }
}