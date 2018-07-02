"use strict";

const express = require('express');
const router = express.Router();
const connection = require('../connection');
const mcache = require('memory-cache');

const cache = () => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body);
        res.sendResponse(body);
      };
      next();
    }
  }
}

//Get trips without cache
router.get('/noCache', (req, res, next) => {
  let medallionArray;
  let dateIn;
  if (Object.keys(req.query).length > 0) {
    medallionArray = req.query.medallionArray ? JSON.parse(req.query.medallionArray) : [];
    dateIn = req.query.dateIn ? JSON.parse(req.query.dateIn) : "";
  }
  if (Object.keys(req.query).length === 0 || medallionArray.length === 0 || dateIn.length === 0) {
    const error = new Error('missing query parameters')
    error.status = 400;
    return next(error);
  }
  else {
    let medallionList = "";
    for (const medallion of medallionArray) {
      medallionList = medallionList ? medallionList + ", '" + medallion + "'" : "'" + medallion + "'";
    }
    const queryString = `select medallion, DATE_FORMAT(pickup_datetime, '%d/%m/%Y') as pickup_date, count(*) as trips from cab_trip_data 
    where medallion in (${medallionList})
    and DATE_FORMAT(pickup_datetime, '%d/%m/%Y') = '${dateIn}' group by medallion`;
    connection.query(queryString, (error, results, fields) => {
      if (error) throw error;
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify(results));
    });
  }
});

/* CLEAR CACHE */
router.get('/clearCache', (req, res, next) => {
  mcache.clear();
  return res.json("cache cleared");
});

//Get trips with cach
router.get('/', cache(), (req, res, next) => {
  let medallionArray;
  let dateIn;
  if (Object.keys(req.query).length > 0) {
    medallionArray = req.query.medallionArray ? JSON.parse(req.query.medallionArray) : [];
    dateIn = req.query.dateIn ? JSON.parse(req.query.dateIn) : "";
  }
  if (Object.keys(req.query).length === 0 || medallionArray.length === 0 || dateIn.length === 0) {
    const error = new Error('missing query parameters')
    error.status = 400;
    return next(error);
    // next( "No query parameters passed");
  }
  else {
    let medallionList = "";
    for (const medallion of medallionArray) {
      medallionList = medallionList ? medallionList + ", '" + medallion + "'" : "'" + medallion + "'";
    }
    const queryString = `select medallion, DATE_FORMAT(pickup_datetime, '%d/%m/%Y') as pickup_date, count(*) as trips from cab_trip_data 
      where medallion in (${medallionList})
      and DATE_FORMAT(pickup_datetime, '%d/%m/%Y') = '${dateIn}' group by medallion`;
    connection.query(queryString, (error, results, fields) => {
      if (error) throw error;
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify(results));
    });
  }
});

module.exports = router;