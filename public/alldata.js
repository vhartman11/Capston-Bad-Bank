/*
var babel = require("@babel/core");
import { transform } from "@babel/core";
import * as babel from "@babel/core";

import 'bootstrap';

import $ from 'jquery'
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";


import {
  HashRouter
} from "react-router-dom";
*/

import React from 'react';



export function AllData() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {

    // this will get all the data from the API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  return (
    <>
    <h5>All Data in Store</h5>
    {data}
    </>
  );
};