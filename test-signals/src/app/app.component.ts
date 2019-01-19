import { Component, OnInit } from "@angular/core";
import { generateRandomArray } from "./components/load-tester";
import { stringify, parse } from "zipson";
import { patents } from "./patents/patents";
import { countryCodeMap } from "./patents/country-code-map";

export const MOVING_WINDOW_LEGNTH = 5;

function getTransformedData(patents) {
  // get lat lang for countries here
  // iterate over and get counts
  console.log("THESE PATENTS", patents);
  let counts = {};
  let countInventors = {};
  let countAssignees = {};

  for (let p of patents) {
    counts[p.country] = ++counts[p.country] || 1;
    countInventors[p.inventor] = ++countInventors[p.inventor] || 1;
    countAssignees[p.assignee] = ++countAssignees[p.assignee] || 1;
  }

  let y = Object.entries(counts).map(([countryAbbrev, patentCount]) => ({
    countryAbbrev,
    patentCount
  }));
  // console.log(counts, y);
  let topCountries = y
    .map(x => ({
      ...x,
      ...countryCodeMap[x.countryAbbrev]
    }))
    .sort((a, b) => b.patentCount - a.patentCount);

  const countryCords = topCountries.map(x => [Number(x.lat), Number(x.long)]);

  const inventors = Object.entries(countInventors)
    .map(([label, value]: [string, number]) => ({
      label: label.toLowerCase(),
      value
    }))
    .sort((a, b) => b.value - a.value);
  const assignees = Object.entries(countAssignees)
    .map(([label, value]: [string, number]) => ({
      label: label.toLowerCase(),
      value
    }))
    .sort((a, b) => b.value - a.value);

  return { topCountries, countryCords, assignees, inventors };
}

const snapshotData = (data, granularity = 10) => {
  let d = [];
  for (let i = 0; i < data.length; i++) {
    // store first relevant 500 results
    if (i <= 500) {
      d.push(data[i]);
    }
    // count the previous ones
    else if (i % granularity === 0) {
      let newItem = data[i];
      newItem.spanLength = granularity;
      d.push(newItem);
    }
  }
  return d;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "test-signals-3";
  avgOperationTime = 0;
  data = [];
  time = new Date().getTime();
  maxOpaterions = 30000;
  firstItem: any;
  lastItem: any;

  ngOnInit() {
    this.time = new Date().getTime();
    console.log("started");
    const MAX_AMOUNT = 30000;
    this.maxOpaterions = MAX_AMOUNT;
    const firstItem = patents[0];
    const lastItem = patents[patents.length - 1];
    this.firstItem = firstItem;

    const bigPatents = patents
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents)
      .concat(patents);

    console.log("a big number of patents", bigPatents);
    this.lastItem = lastItem;
    localStorage.setItem("patents", stringify(bigPatents));
    this.data = snapshotData(bigPatents);

    console.log("QUOTAS", navigator.storage.estimate().then(console.log));
  }

  comparisonFunction(a, b) {
    return a - b;
  }

  quickSort({
    arr,
    leftPos,
    rightPos,
    arrLength,
    transformToSortableValue = x => x
  }) {
    let initialLeftPos = transformToSortableValue(leftPos);
    let initialRightPos = transformToSortableValue(rightPos);
    let direction = true;
    let pivot = rightPos;

    const swap = (arr, el1, el2) => {
      let swapedElem = arr[el1];
      arr[el1] = arr[el2];
      arr[el2] = swapedElem;
    };

    while (leftPos - rightPos < 0) {
      if (direction) {
        if (arr[pivot] < arr[leftPos]) {
          swap(arr, pivot, leftPos);
          pivot = leftPos;
          rightPos--;
          direction = !direction;
        } else leftPos++;
      } else {
        if (arr[pivot] <= arr[rightPos]) {
          rightPos--;
        } else {
          swap(arr, pivot, rightPos);
          leftPos++;
          pivot = rightPos;
          direction = !direction;
        }
      }
    }
    if (pivot - 1 > initialLeftPos) {
      this.quickSort({
        arr,
        leftPos: initialLeftPos,
        rightPos: pivot - 1,
        arrLength
      });
    }
    if (pivot + 1 < initialRightPos) {
      this.quickSort({
        arr,
        leftPos: pivot + 1,
        rightPos: initialRightPos,
        arrLength
      });
    }
  }

  doWork() {
    // get active elements to display

    // do some sorting
    this.time = new Date().getTime();
    console.time("sorting");
    this.quickSort({
      arr: this.data,
      leftPos: this.data[0],
      rightPos: this.data[this.data.length - 1],
      arrLength: this.data.length,
      transformToSortableValue: a => new Date(a.date).getTime()
    });
    console.timeEnd("sorting");

    let transformedData = getTransformedData(this.data);
    this.avgOperationTime = new Date().getTime() - this.time;
    console.log("ARR LENGTH", this.data.length, transformedData);
  }
}
