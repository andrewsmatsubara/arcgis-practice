import "@arcgis/core/assets/esri/themes/light/main.css";
import "@arcgis/map-components/dist/arcgis-map-components/arcgis-map-components.css";
import "@arcgis/coding-components/main.css";
import "@arcgis/charts-components/dist/arcgis-charts-components/arcgis-charts-components.css";
import "@arcgis/common-components/main.css";
import "@esri/calcite-components/main.css";
import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import { defineCustomElements as defineCodingElements } from "@arcgis/coding-components/dist/loader";
import { defineCustomElements as defineChartsElements } from "@arcgis/charts-components/dist/loader";
import { defineCustomElements as defineCommonElements } from "@arcgis/common-components/loader";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/loader";

defineCustomElements(window);
defineCodingElements(window);
defineChartsElements(window);
defineCommonElements(window);
defineCalciteElements(window);

const init = async () => {
  const viewElement = document.querySelector("arcgis-map");

  if (viewElement) {
    await viewElement.viewOnReady();
  }

  const arcadeEditorElement = document.querySelector("arcgis-arcade-editor");

  if (arcadeEditorElement) {
    arcadeEditorElement.testData = {
      profileVariableInstances: {},
      spatialReference: { wkid: 4326 },
    };
    arcadeEditorElement.profile = {
      bundles: ["core", "data-access", "database", "geometry", "portal-access"],
      variables: [],
    };
    arcadeEditorElement.addEventListener("arcgisScriptChange", (event) => {
      console.log("scriptChange", event.detail);
      const handler = async () => {
        const testResult = await arcadeEditorElement
          .getTestResult()
          .catch(console.error);
        console.log("outputType", testResult);
      };
      handler().catch();
    });
    arcadeEditorElement.addEventListener("arcgisDiagnosticsChange", (event) => {
      console.log("diagnosticsChange", event.detail);
    });
  }
};

init();
