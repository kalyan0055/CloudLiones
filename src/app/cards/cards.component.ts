import { Component, OnInit, ViewEncapsulation, Pipe,PipeTransform  } from '@angular/core';
import * as _ from 'underscore';
import { isNgTemplate } from '@angular/compiler';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit  {
  // deck = [{ type: "Spade", value: "A" }, { type: "Spade", value: "2" }, { type: "Spade", value: "3" }, { type: "Spade", value: "4" }, { type: "Spade", value: "5" }, { type: "Spade", value: "6" }, { type: "Spade", value: "7" }, { type: "Spade", value: "8" }, { type: "Spade", value: "9" }, { type: "Spade", value: "10" }, { type: "Spade", value: "K" }, { type: "Spade", value: "Q" }, { type: "Spade", value: "J" }];


  Suit = [{ type: "Spades", isClicked: false, icon:"&#x2660;", color: "black", },
  { type: "Hearts", isClicked: false, icon: "&#x2665;", color: "red" },
  { type: "Clubs", isClicked: false, icon: "&#x2663;", color: "black" },
  { type: "Diamonds", isClicked: false, icon: "&#x2666;", color: "red" }]

  reset_Deck = [];
  selected_card;
  isDraw: boolean;
  max_min_array = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  possible_cards = [];
  viewDraw = false;
  max: number = 0;
  min: number = 0;
  FinalCards = [];
  Checkboxlength = [];
  no_cards_inhand = [];


  constructor(private santizer: DomSanitizer) { }

  ngOnInit() {
  }
  getIcon(type:string)
  {
    debugger
    if(type=="Spades")
    {
      var icon="&#x2660;";
      return this.santizer.bypassSecurityTrustResourceUrl(icon);
    }

  }
 
  selectedSuit(suit, $event) {
    debugger
    if ($event.srcElement.checked) {
      this.Checkboxlength.push(suit.type)
      this.Suit[this.Suit.indexOf(suit)].isClicked = true;
    } else {
      this.Suit[this.Suit.indexOf(suit)].isClicked = false;
      this.Checkboxlength.splice(this.Checkboxlength.indexOf(suit.type), 1)
    }
   
    if (this.Checkboxlength.length > 0) {
      this.no_cards_inhand = [];
      //Showing purpose
      for (let i = 1; i <= this.Checkboxlength.length * 13; i++) {
        this.no_cards_inhand.push(i)
      }
      // this.no_cards_inhand.reverse();
      //Generationg cards
      this.possible_cards = [];
      for (let j = 0; j < this.Checkboxlength.length; j++) {
        for (let k = 1; k <= 13; k++) {
              // let t:any = k;
              // if(k==1 || k==11 || k==12 ||k==13 ){
              //   switch (k) {
              //     case 1: t="A"; break;
              //     case 11: t="J"; break;
              //     case 12: t="Q"; break;
              //     case 13: t="K"; break;
              //     default:
              //       break;
              //   }
              // }
              this.possible_cards.push({ type: this.Checkboxlength[j], value: k,color:this.Suit[j].color,icon:this.Suit[j].icon })
        }
      }

    }
  }
 
  max_selection(value) {
    if (this.min > 0) {
      let max = this.max_min_array.indexOf(value) + 1;

      if (this.min > max) {
        alert('Max value Can not be less than min Value')
        this.max = 0;
      } else {
        this.max = max;
      }`  `
    } else {
      this.max = this.max_min_array.indexOf(value) + 1
    }
  }

  min_selection(value) {

    this.min = this.max_min_array.indexOf(value) + 1;

    if (this.max > 0) {
      let min = this.max_min_array.indexOf(value) + 1;
      console.log(min, this.max);
      if (min < this.max) {
        this.min = min;
      } else {
        alert('Min value should be less than max value')
      }
    } else {
      this.min = this.max_min_array.indexOf(value) + 1;
    }
  }

  getCards() {
    this.viewDraw = true;
    if (this.possible_cards.length > 0 && this.max > 0 && this.min > 0) {
      this.FinalCards = [];
      let cards = this.possible_cards.filter(item => {
        console.log(item, 'item ');
        if ((item.value >= this.min) && (item.value <= this.max)) {
          this.FinalCards.push(item)
          //  return item;
        }
      })
      this.FinalCards =_.shuffle(this.FinalCards);
      console.log(this.FinalCards, 'after filter');
    }

  }

  draw() {
    if (this.FinalCards.length > 0) {
      let draw = this.FinalCards[Math.floor(Math.random() * this.FinalCards.length)];
      this.selected_card = draw;
      this.FinalCards.splice(this.FinalCards.indexOf(draw), 1)
      this.reset_Deck.push(draw);
      console.log(this.FinalCards, 'before shuffle');
      this.FinalCards = _.shuffle(this.FinalCards);
      console.log(this.FinalCards, 'after shuffle');
      this.isDraw = true
    } else {
      this.isDraw = false;
    }
  }
  reset(){
    this.selected_card=null;
    this.no_cards_inhand=[];
    this.viewDraw =false;
    this.possible_cards=[];
    this.FinalCards=[];
    this.reset_Deck=[];
    this.Checkboxlength=[];    
    this.Suit.filter(item=>{
      item.isClicked = false;
    })
  }

}
