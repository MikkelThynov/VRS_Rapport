import React from "react";
import { Image } from "react-native";

const imageSource = Image.resolveAssetSource(
  require("../Ventilationsrens_logo.png")
);

function generateContent(
  title,
  name,
  customerName,
  address,
  postnr,
  company,
  gear,
  SEL_value,
  date,
  vent,
  model,
  trin,
  m2,
  watt,
  number,
  email,
  website,
  _rum6,
  _rum6_luft,
  _1st_1,
  _1st_2,
  _1st_3,
  _2nd_1,
  _2nd_2,
  _2nd_3,
  _3rd_1,
  _3rd_2,
  _3rd_3,
  _4th_1,
  _4th_2,
  _4th_3,
  _5th_1,
  _5th_2,
  _5th_3,
  _6th_1,
  _6th_2,
  _6th_3,
  check1_ja,
  check2_ja,
  check3_ja,
  check4_ja,
  check1_nej,
  check2_nej,
  check3_nej,
  check4_nej,
  totalAirOut,
  stue_1,
  køkken_1,
  room_1_1,
  room_2_1,
  room_3_1,
  room_4_1,
  room_5_1,
  køkken_ekstra_1,
  gang_1,
  kontor_1,
  stue_2,
  køkken_2,
  room_1_2,
  room_2_2,
  room_3_2,
  room_4_2,
  room_5_2,
  køkken_ekstra_2,
  gang_2,
  kontor_2,
  stue_3,
  køkken_3,
  room_1_3,
  room_2_3,
  room_3_3,
  room_4_3,
  room_5_3,
  køkken_ekstra_3,
  gang_3,
  kontor_3,
  totalAirIn,
  minimumAir,
  undertryk
) {
  const udsugning = {
    rum6: _rum6,
    rum6_luft: _rum6_luft,
    _1st_1: _1st_1,
    _1st_2: _1st_2,
    _1st_3: _1st_3,
    _2nd_1: _2nd_1,
    _2nd_2: _2nd_2,
    _2nd_3: _2nd_3,
    _3rd_1: _3rd_1,
    _3rd_2: _3rd_2,
    _3rd_3: _3rd_3,
    _4th_1: _4th_1,
    _4th_2: _4th_2,
    _4th_3: _4th_3,
    _5th_1: _5th_1,
    _5th_2: _5th_2,
    _5th_3: _5th_3,
    _6th_1: _6th_1,
    _6th_2: _6th_2,
    _6th_3: _6th_3,
  };

  const indblæsning = {
    stue_1: stue_1,
    køkken_1: køkken_1,
    room_1_1: room_1_1,
    room_2_1: room_2_1,
    room_3_1: room_3_1,
    room_4_1: room_4_1,
    room_5_1: room_5_1,
    køkken_ekstra_1: køkken_ekstra_1,
    gang_1: gang_1,
    kontor_1: kontor_1,
    stue_2: stue_2,
    køkken_2: køkken_2,
    room_1_2: room_1_2,
    room_2_2: room_2_2,
    room_3_2: room_3_2,
    room_4_2: room_4_2,
    room_5_2: room_5_2,
    køkken_ekstra_2: køkken_ekstra_2,
    gang_2: gang_2,
    kontor_2: kontor_2,
    stue_3: stue_3,
    køkken_3: køkken_3,
    room_1_3: room_1_3,
    room_2_3: room_2_3,
    room_3_3: room_3_3,
    room_4_3: room_4_3,
    room_5_3: room_5_3,
    køkken_ekstra_3: køkken_ekstra_3,
    gang_3: gang_3,
    kontor_3: kontor_3,
    totalAirIn: totalAirIn,
  };

  const htmlStyles = `
    * {
    border: 0;
    box-sizing: content-box;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
    vertical-align: top;
  }
  
  h1 {
    font: bold 100% sans-serif;
    letter-spacing: 0.5em;
    text-align: center;
    text-transform: uppercase;
  }
  
  /* table */
  table {
    font-size: 75%;
    table-layout: fixed;
    width: 100%;
  }
  
  table {
    border-collapse: separate;
    border-spacing: 2px;
  }
  
  th,
  td {
    border-width: 1px;
    padding: 0.3em;
    position: relative;
    text-align: left;
  }
  
  th,
  td {
    border-radius: 0.25em;
    border-style: solid;
  }
  
  th {
    background: #EEE;
    border-color: #BBB;
  }
  
  td {
    border-color: #DDD;
  }
  
  /* page */
  html {
    font: 16px/1 'Open Sans', sans-serif;
    overflow: auto;
  }
  
  html {
    background: #999;
    cursor: default;
  }
  
  body {
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.25in;
  }
  
  body {
    background: #FFF;
    border-radius: 1px;
    /*box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);*/
  }
  
  /* header */
  header {
    margin: 0 0 0em;
  }
  
  header:after {
    clear: both;
    content: "";
    display: table;
  }
  
  header h1 {
    background: #000;
    border-radius: 0.25em;
    color: #FFF;
    margin: 0 0 1em;
    padding: 0.5em 0;
  }
  
  header address {
    float: left;
    font-size: 75%;
    font-style: normal;
    line-height: 1.25;
    margin: 0 1em 1em 0;
  }
  
  header address p {
    margin: 0 0 0.25em;
  }
  
  header span,
  header img {
    display: block;
    float: right;
  }
  
  header span {
    margin: 0 0 1em 1em;
    max-height: 25%;
    max-width: 60%;
    position: relative;
  }
  
  header img {
    max-height: 100%;
    max-width: 100%;
  }
  
  /* article */
  article,
  article address,
  table.meta,
  table.inventory {
    margin: 0 0 0em;
  }
  
  article:after {
    clear: both;
    content: "";
    display: table;
  }
  
  article h1 {
    clip: rect(0 0 0 0);
    position: absolute;
  }
  
  article address {
    float: left;
    font-size: 125%;
    font-weight: bold;
  }
  
  /* table meta & balance */
  table.meta,
  table.balance {
    float: right;
    width: 45%;
    padding-bottom: 1.5em;      /* ------ Creating distance between 2 table and udsugning */
  }

  /* left table */
  table.left{
    float: left;
    width: 45%;
  }

  table.left th {
    width: 40%;
  }

  table.left td {
    width: 60%;
  }
  
 /* table.meta:after,
  table.balance:after, table.left:after. table.my-tableLeft:after, table.my-tableRight:after {
    clear: both;
    content: "";
    display: table;
  }*/
  
  /* table meta */
  table.meta th {
    width: 60%;
  }
  
  table.meta td{
    width: 40%;
  }

  table.meta td {
    text-align: center;
  }

  /* table titles*/

  table.tableTitle th{
    padding: 0.5em;
  }

  table.tableTitle th{
    font-weight: bold;
    text-align: center;
  }
  
  /* table items */
  table.inventory {
    clear: both;
    width: 100%;
  }
  
  table.inventory th {
    font-weight: bold;
    text-align: center;
  }

  table.inventory td {
    text-align: right;
  }

  
  /* table balance */
  
  table.balance th,
  table.balance td {
    width: 50%;
  }
  
  table.balance td {
    text-align: right;
  }
  
  /* aside */
  
  aside h1 {
    border: none;
    border-width: 0 0 1px;
    margin: 0 0 1em;
  }
  
  aside h1 {
    border-color: #999;
    border-bottom-style: solid;
  }

  .my-tableLeft{
  width: 33.33%;
  margin: 0 auto;
  float: left;
  border-collapse: separate;
  margin-bottom: 1.5em;
  }

  .my-tableRight{
    width: 33.33%;
    margin: 0 auto;
    float: right;
    border-collapse: separate;
    margin-bottom: 1.5em;
    }

  .my-table th {
    width: 18.22%;
    font-weight: bold;
  }
  
  .my-table td {
    width: 15.11%;
  }

  img{
    width: 6%;
    position: absolute;
    top: 30;
    left: 40;
    /*left: 50%;
    transform: translateX(-50%);*/
  }

  

  .footer {
  position: absolute;
  bottom: 20;
  width: 93.5%;
  background-color: #000;
  padding: 17px 0px;
  border-radius: 0.25em;
  display: flex;
  align-items: center;
}

.footer .left,
.footer .left_m,
.footer .right_m,
.footer .right {
  position: absolute;
  width: 25%;
  bottom: 0;
  font-size: 70%;
  
  color: #e8e8e8;
  padding: 11px 20px;
}

.footer .left {
  left: 0;
}

.footer .left_m {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.footer .right_m {
  right: 0%;
  text-align: right;
}

/*.footer .right {
  right: 0;
  text-align: right;
}*/
`;
  return `
    <html>
    <head>
      <meta charset="utf-8">
      <title>Rapport</title>
      
      <style>
        ${htmlStyles}
      </style>
    </head>
    <body>
    <img src="${imageSource.uri}" />
      <header>
        <h1>${title}</h1>
        <!--
        <info>
          <p>${name}</p>
          <p>${number}</p>
          <p>${email}</p>
        </info>-->
      </header>
      <article>

      <table class="inventory" style="margin-bottom: 1.5em">
      <thead>

      <!-- Initial info -->
        <tr>
          <th style="width: 13%"><span>Tekninker navn</span></th>
          <td style="width: 20.33%"><span>${name}</span></td>
          <th style="width: 16.665%"><span>Firma</span></th>
          <td style="width: 16.665%"><span>${company}</span></td>
        </tr>
      </thead>
      <thead>
        <tr>
        <th style="width: 10%"><span>Navn</span></th>
        <td style="width: 23.33%"><span>${customerName}</span></td>
        <th style="width: 10%"><span>Måleudstyr</span></th>
        <td style="width: 23.33%"><span>${gear}</span></td>
        </tr>
      </thead>
      <thead>
        <tr>
        <th style="width: 10%"><span>Adresse</span></th>
        <td style="width: 23.33%"><span>${address}</span></td>
        <th style="width: 10%"><span>SEL-værdi</span></th>
        <td style="width: 23.33%"><span>${SEL_value}</span></td>
        </tr>
      </thead>
      <thead>
        <tr>
        <th style="width: 10%"><span>Postnummer</span></th>
        <td style="width: 23.33%"><span>${postnr}</span></td>
        <th style="width: 10%"><span>Dato</span></th>
        <td style="width: 23.33%"><span>${date}</span></td>
        </tr>
      </thead>
    </table>

    <table class="meta">
      <tr>
        <th><span>Kontrol OK</span></th>
        <td><span>Ja</span></td>
        <td><span>Nej</span></td>
      </tr>
      <tr>
        <th><span>Kanaler rene (støv)</span></th>
        <td>${check1_ja}</td>
        <td>${check1_nej}</td>
      </tr>
      <tr>
        <th><span>Filtrer kontrolleret</span></th>
        <td>${check2_ja}</td>
        <td>${check2_nej}</td>
      </tr>
      <tr>
        <th><span>Kanal isolering</span></th>
        <td>${check3_ja}</td>
        <td>${check3_nej}</td>
      </tr>
      <tr>
        <th><span>Varmeveksler</span></th>
        <td>${check4_ja}</td>
        <td>${check4_nej}</td>
      </tr>
    </table>
    <table class="left">
      <tr>
        <th><span>Ventilationsanlæg</span></th>
        <td><span>${vent}</span></td>
      </tr>
      <tr>
        <th><span>Model</span></th>
        <td>${model}</td>
      </tr>
      <tr>
        <th><span>Trin valgt</span></th>
        <td>${trin}</td>
      </tr>
      <tr>
        <th><span>Antal m2</span></th>
        <td>${m2}</td>
      </tr>
      <tr>
        <th><span>Watt ydelse</span></th>
        <td>${watt}</td>
      </tr>
    </table>
    <!-- --------------------- MÅLERAPPORT - UDSUGNING ------------------------ -->

        <table class="tableTitle">
          <tr>
            <th style="padding:0.75em 0"><span>Målerapport - Udsugning</span></th>   
        </table>
        <table class="tableTitle">
          <tr>
            <th style="width: 33.33%"><span>Rumbegtegnelse</span></th>
            <th style="width: 33.33%"><span>Planlagt luftmængde</span></th>  
            <th style="width: 33.33%"><span>Målt Luftmængde</span></th>     
        </table>

        <table class="inventory">

          <thead>

          <!-- Row 1 -->
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Bad 1</span></th>
              <td style="width: 25.33%"><span>54</span></th>
              <td style="width: 8%"><span>m3/h</span></th>
              <td style="width: 11.11%"><span>${udsugning._1st_1}</span></th>
              <td style="width: 11.11%"><span>${udsugning._1st_2}</span></th>
              <td style="width: 11.11%"><span>${udsugning._1st_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Bad 2</span></th>
              <td style="width: 25.33%"><span>54</span></th>
              <td style="width: 8%"><span>m3/h</span></th>
              <td style="width: 11.11%"><span>${udsugning._2nd_1}</span></th>
              <td style="width: 11.11%"><span>${udsugning._2nd_2}</span></th>
              <td style="width: 11.11%"><span>${udsugning._2nd_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Køkken</span></th>
              <td style="width: 25.33%"><span>72</span></th>
              <td style="width: 8%"><span>m3/h</span></th>
              <td style="width: 11.11%"><span>${udsugning._3rd_1}</span></th>
              <td style="width: 11.11%"><span>${udsugning._3rd_2}</span></th>
              <td style="width: 11.11%"><span>${udsugning._3rd_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Bryggers</span></th>
              <td style="width: 25.33%"><span>36</span></th>
              <td style="width: 8%"><span>m3/h</span></th>
              <td style="width: 11.11%"><span>${udsugning._4th_1}</span></th>
              <td style="width: 11.11%"><span>${udsugning._4th_2}</span></th>
              <td style="width: 11.11%"><span>${udsugning._4th_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Toilet</span></th>
              <td style="width: 25.33%"><span>36</span></th>
              <td style="width: 8%"><span>m3/h</span></th>
              <td style="width: 11.11%"><span>${udsugning._5th_1}</span></th>
              <td style="width: 11.11%"><span>${udsugning._5th_2}</span></th>
              <td style="width: 11.11%"><span>${udsugning._5th_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>${udsugning.rum6}</span></th>
              <td style="width: 25.33%"><span>${udsugning.rum6_luft}</span></th>
              <td style="width: 8%"><span>m3/h</span></th>
              <td style="width: 11.11%"><span>${udsugning._6th_1}</span></th>
              <td style="width: 11.11%"><span>${udsugning._6th_2}</span></th>
              <td style="width: 11.11%"><span>${udsugning._6th_3}</span></th>
            </tr>
          </thead>
          <table class="my-tableLeft">
            <tr>
              <th><span>Total mængde luft</span></th>
              <td><span>${totalAirOut} m3/h</span></td>
            </tr>
          </table>

        </table>

        <table class="tableTitle" style="margin-top:1.5em">
          <tr>
            <th style="padding:0.75em 0"><span>Målerapport - Indblæsning</span></th>   
        </table>

        <table class="tableTitle">
          <tr>
            <th style="width: 33.33%"><span>Rumbegtegnelse</span></th>
            <th style="width: 33.33%"><span>Planlagt luftmængde</span></th>  
            <th style="width: 33.33%"><span>Målt Luftmængde</span></th>     
        </table>


        <table class="inventory">
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Stue</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.stue_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.stue_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.stue_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Køkken/Alrum</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.køkken_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.køkken_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.køkken_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Værelse 1</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_1_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_1_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_1_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Værelse 2</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_2_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_2_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_2_3}</span></th>
            </tr>
          </thead>
           
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Værelse 3</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_3_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_3_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_3_3}</span></th>
            </tr>
          </thead>
          
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Værelse 4</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_4_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_4_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_4_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Værelse 5</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_5_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_5_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.room_5_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Evt køkken</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.køkken_ekstra_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.køkken_ekstra_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.køkken_ekstra_3}</span></th>
            </tr>
          </thead>
          
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Gang</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.gang_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.gang_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.gang_3}</span></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="width: 10%"><span>1</span></th>
              <td style="width: 23.33%"><span>Værelse 4</span></th>
              <td style="width: 25.33%"><span>0,3 m3/h pr m2</span></th>
              <td style="width: 8%"><span></span></th>
              <td style="width: 11.11%"><span>${indblæsning.kontor_1}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.kontor_2}</span></th>
              <td style="width: 11.11%"><span>${indblæsning.kontor_3}</span></th>
            </tr>
          </thead>
          

          <table class="my-tableLeft">
            <tr>
              <th><span>Total mængde luft</span></th>
              <td><span>${indblæsning.totalAirIn} m3/h</span></td>
            </tr>
            <tr>
              <th><span>Minimum m3/h</span></th>
              <td><span>${minimumAir} m3/h</span></td>
            </tr>
          </table>
          <table class="my-tableRight">
            <tr>
              <th><span>Undertryk i %</span></th>
              <td><span>${undertryk} %/h</span></td>
            </tr>
          </table>
      </article>

      <!-- <aside>
        <h1><span>Additional Notes</span></h1>
        <div>
          <p>...</p>
        </div>
      </aside> -->

      
      <div class="footer">
      <p class="left">Tlf: 52114109</p>
      <p class="left_m">kontakt@ventilationsrens.dk</p>
      <p class="right_m">www.ventilationsrens.dk</p>
      </div>
      
      
    </body>
  </html>
    `;
}

export default generateContent;
