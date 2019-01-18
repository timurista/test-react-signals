import { Component, OnInit } from "@angular/core";
import { generateRandomArray } from "./components/load-tester";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "test-signals-3";
  avgOperationTime = 0;
  data = [];
  time = new Date().getSeconds();

  ngOnInit() {}

  doWork() {
    this.time = new Date().getSeconds();
    console.log("started");
    const MAX_AMOUNT = 100000;
    const arr = generateRandomArray(MAX_AMOUNT);
    const firstItem = arr[0];
    const lastItem = arr[arr.length - 1];
    console.log(firstItem, lastItem);

    this.avgOperationTime = new Date().getSeconds() - this.time;

    // do some mapping
    console.timeStamp("sorting");
    arr =>
      arr.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    console.timeStamp("end sorting");
  }
}
