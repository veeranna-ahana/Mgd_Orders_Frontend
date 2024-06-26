import React, { startTransition, useEffect, useState } from "react";
import axios from "axios";
import magodlogo from "../../../../../../../../../ML-LOGO.png";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import {
  borderBottom,
  borderRight,
  fontSize,
  padding,
  style,
  textAlign,
  width,
} from "@mui/system";
// import magodlogo from "../Logo/MagodLogo.png";

const styles = StyleSheet.create({
  page: {
    fontSize: 8,
    flexDirection: "column",
  },
  tableContainerMain: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  tableTitle: {
    marginTop: "25px",
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: "10px",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  globalfontwithbold: {
    fontSize: "8px",
    fontFamily: "Helvetica-Bold",
  },
  globalfontwithoutbold: {
    fontSize: "8px",
  },
  logo: {
    width: "60px",
    height: "60px",
  },
  HeadingText: {
    textAlign: "center",
    marginLeft: "160px",
    flexDirection: "row",
    justifyContent: "center",
  },
  Heading: {
    textAlign: "center",
    flexDirection: "row",
    width: "500px",
    padding: "1px",
  },
  subdetails: {
    width: "570",
    border: 1,
    marginLeft: "10px",
    height: "20px",
    marginTop: "10px",
    textAlign: "center",
  },
  // subdetailsshipping: {
  //     width: "60px",
  //     borderRight: 1,
  //     borderTop: 1,
  //     borderBottom: 1,
  //     height: "140px",
  //     marginTop: "10px",
  // },
  subsection1data: {
    marginLeft: "10px",
    width: "100%",
    textAlign: "left",
    flexDirection: "row",
    padding: "3px",
  },
  smalltable: {
    width: "290px",
    flexDirection: "row",
    textAlign: "left",
  },
  smalltable: {
    width: "570px",
    flexDirection: "row",
    textAlign: "left",
  },
  sideheading: {
    width: "71.25px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideheadingdata: {
    width: "71.25px",
    borderBottom: 1,
    borderRight: 1,
  },
  // sideheadingdata2: {
  //     width: "60px",
  //     borderBottom: 1,
  //     borderRight: 1,
  // },

  // sideHeadData1: {
  //     width: "100px",
  //     borderBottom: 1,
  //     borderRight: 1,
  // },

  // sideHead2: {
  //     width: "100px",
  //     borderBottom: 1,
  //     borderRight: 1,
  // },

  // sideHeadData2: {
  //     width: "233px",
  //     borderBottom: 1,
  //     borderRight: 1,
  // },
  flexi: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  tableContainer1: {
    width: "142.5px",
  },
  tableViewMain: {
    width: "570px",
    borderLeft: 1,
    marginLeft: "10px",
  },
  itemlist: {
    width: "570px",
    borderBottom: 1,
    borderRight: 1,
    borderLeft: 1,
    textAlign: "center",
    marginLeft: "10px",
  },
  tableDisplay: {
    width: "570px",

    borderLeft: 1,
    marginLeft: "10px",
    borderRight: 1,
  },
  tableDisplay2: {
    width: "570px",
    marginLeft: "10px",
    borderRight: 1,
    borderLeft: 1,
  },
  comments: {
    marginLeft: "5px",
    marginTop: "5px",
    height: "50px",
  },

  drawingname: {
    width: "47.5px",
    textAlign: "center",
    borderRight: 1,
    padding: "1px",
    borderBottom: 1,
  },
  drawingname01: {
    width: "47.5px",
    textAlign: "center",
    borderRight: 1,
    padding: "1px",
    // borderBottom: 1,
  },
  beadDia: {
    width: "47.5px",
    borderRight: 1,
    padding: "1px",
    textAlign: "center",
    borderBottom: 1,
  },
  power: {
    width: "47.5px",
    textAlign: "center",
    borderRight: 1,
    padding: "1px",
    borderBottom: 1,
  },
  energy: {
    width: "47.5px",
    textAlign: "center",
    borderRight: 1,
    borderBottom: 1,
    padding: "1px",
  },
  pulseWidth: {
    width: "47.5px",
    borderRight: 1,
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
  },
  frequency: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
    borderRight: 1,
  },
  pulseShape: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
    borderRight: 1,
  },
  speed: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
    borderRight: 1,
  },
  gasFlow: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
    borderRight: 1,
  },
  stepover: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
    borderRight: 1,
  },

  standOff: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
    borderRight: 1,
  },

  layerThk: {
    width: "47.5px",
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
  },
  tableDataView: {
    width: "570px",
    borderBottom: 1,
    borderRight: 1,
    borderLeft: 1,
    marginLeft: "10px",
    height: "150px",
  },

  tableDataView2: {
    width: "570px",
    borderBottom: 1,
    borderRight: 1,
    borderLeft: 1,
    marginLeft: "10px",

    height: "230px",
  },
  pagetableView: {
    width: "570px",
    borderBottom: 1,
    borderRight: 1,
    marginLeft: "10px",
  },
  pageitem: {
    width: "150px",
    paddingLeft: 5,
    borderLeft: 1,
  },
  SignatureSection: {
    width: "570px",
    borderBottom: 1,
    borderRight: 1,
    marginLeft: "10px",
  },

  SignatureData: {
    width: "400px",
    paddingLeft: 5,
    borderLeft: 1,
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  SignatureData2: {
    width: "170px",
    paddingLeft: 5,
    borderLeft: 1,
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  SignatureData222: {
    width: "400px",
    paddingLeft: 5,
    borderLeft: 1,
    height: "80px",
  },
  SignatureData22: {
    width: "170px",
    paddingLeft: 5,
    borderLeft: 1,
    height: "80px",
  },
  bottomtext: {
    width: "570px",
    marginLeft: "10px",
  },

  secondBox: {
    width: "570",
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    marginLeft: "10px",
    height: "20px",
  },
  tableData01: {
    fontSize: "8px",
    fontFamily: "Helvetica-Bold",
    width: "285px",
    borderRight: 1,
    borderBottom: 1,
    borderLeft: 1,
    marginLeft: "10px",
    padding: 1,
    textAlign: "center",
  },
  tableData03: {
    fontSize: "8px",
    fontFamily: "Helvetica-Bold",
    width: "285px",
    borderBottom: 1,
    borderRight: 1,
    padding: 1,
    textAlign: "center",
  },
  tableInput01: {
    fontSize: "8px",
    width: "285px",
    borderRight: 1,
    borderBottom: 1,
    borderLeft: 1,
    marginLeft: "10px",
    padding: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
  tableInput03: {
    fontSize: "8px",
    width: "285px",
    borderRight: 1,
    borderBottom: 1,
    padding: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
});

const SolidStatePdf = ({ formData }) => {
  const numCopies = 3; // Number of copies you want

  const copiesData = [{ title: "Original For Buyer" }];

  const renderContent = () => {
    return (
      <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.tableContainer}>
              <View>
                <Image src={magodlogo} style={styles.logo} />
              </View>
              <View>
                <Text
                  style={[
                    styles.tableTitle,
                    {
                      fontSize: "15px",
                      marginLeft: "110px",
                      textDecoration: "underline",
                    },
                  ]}
                >
                  Magod Laser Machining Pvt Ltd
                </Text>
              </View>
              {/* <View style={styles.row}>
                <Text
                  style={[
                    styles.globalfontwithoutbold,
                    { marginLeft: "110px", textDecoration: "underline" },
                  ]}
                >
                  Returnable Material Receipt Voucher
                </Text>
              </View> */}
            </View>
          </View>
        </View>

        <View style={styles.tableContainerMain}>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.subdetails}>
                <View style={styles.section1}>
                  <View style={styles.column}>
                    <Text
                      style={[
                        styles.globalfontwithbold,
                        { marginLeft: "10px", padding: 3 },
                      ]}
                    >
                      LASER WELDING JOB PARAMETER SHEET-SOLIDSTATE LASER
                    </Text>
                  </View>
                </View>
              </View>

              {/* <View style={styles.secondBox}>
                LASER WELDING JOB PARAMETER SHEET-SOLIDSTATE LASER
              </View> */}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.tableViewMain}>
                <View style={styles.row}>
                  <View style={styles.tableContainer1}>
                    <View style={styles.smalltable}>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <View style={styles.sideheading}>
                            <Text
                              style={[
                                styles.globalfontwithbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Schedule No
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.sideheadingdata}>
                            <Text
                              style={[
                                styles.globalfontwithoutbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              {formData.taskNo}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.smalltable}>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <View style={styles.sideheading}>
                            <Text
                              style={[
                                styles.globalfontwithbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Date
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.sideheadingdata}>
                            <Text
                              style={[
                                styles.globalfontwithoutbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              {formData.taskDate}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableContainer1}>
                    <View style={styles.column}>
                      {/* <View style={styles.smalltable}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.sideheading}>
                              <Text
                                style={[
                                  styles.globalfontwithbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                Material 1
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.sideheadingdata}>
                              <Text
                                style={[
                                  styles.globalfontwithoutbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                {" "}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View> */}

                      {/* <View style={styles.smalltable}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.sideheading}>
                              <Text
                                style={[
                                  styles.globalfontwithbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                Material 2
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.sideheadingdata}>
                              <Text
                                style={[
                                  styles.globalfontwithoutbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                {""}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View> */}

                      <View style={styles.smalltable}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.sideheading}>
                              <Text
                                style={[
                                  styles.globalfontwithbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                Filler
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.sideheadingdata}>
                              <Text
                                style={[
                                  styles.globalfontwithoutbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                {formData.filler}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.smalltable}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.sideheading}>
                              <Text
                                style={[
                                  styles.globalfontwithbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                Joint Type
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.sideheadingdata}>
                              <Text
                                style={[
                                  styles.globalfontwithoutbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                {formData.jointType}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableContainer1}>
                    {/* <View style={styles.smalltable}>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <View style={styles.sideheading}>
                            <Text
                              style={[
                                styles.globalfontwithbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Thk1
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.sideheadingdata}>
                            <Text
                              style={[
                                styles.globalfontwithoutbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Sales
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View> */}

                    {/* <View style={styles.smalltable}>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <View style={styles.sideheading}>
                            <Text
                              style={[
                                styles.globalfontwithbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Thk2
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.sideheadingdata}>
                            <Text
                              style={[
                                styles.globalfontwithoutbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              {" "}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View> */}

                    <View style={styles.smalltable}>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <View style={styles.sideheading}>
                            <Text
                              style={[
                                styles.globalfontwithbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Dia
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.sideheadingdata}>
                            <Text
                              style={[
                                styles.globalfontwithoutbold,
                                { paddingLeft: 5 },
                              ]}
                            ></Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.smalltable}>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <View style={styles.sideheading}>
                            <Text
                              style={[
                                styles.globalfontwithbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              Machine
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.sideheadingdata}>
                            <Text
                              style={[
                                styles.globalfontwithoutbold,
                                { paddingLeft: 5 },
                              ]}
                            >
                              {formData.machine}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableContainer1}>
                    <View style={styles.column}>
                      <View style={styles.smalltable}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.sideheading}>
                              <Text
                                style={[
                                  styles.globalfontwithbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                Gas Type
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.sideheadingdata}>
                              <Text
                                style={[
                                  styles.globalfontwithoutbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                {formData.gasType}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.smalltable}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.sideheading}>
                              <Text
                                style={[
                                  styles.globalfontwithbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                Operator
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <View style={styles.sideheadingdata}>
                              <Text
                                style={[
                                  styles.globalfontwithoutbold,
                                  { paddingLeft: 5 },
                                ]}
                              >
                                {formData.operator}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.tableData01}>Material</Text>
            <Text style={styles.tableData03}>Thickness</Text>
          </View>

          {formData.materialTableData?.map((item, index) => (
            <View key={index} style={styles.row}>
              {/* <Text style={styles.tableInput02}>{index + 1}</Text> */}
              <Text style={styles.tableInput01}>{item.Material}</Text>
              <Text style={styles.tableInput03}>{item.Thickness}</Text>
            </View>
          ))}

          <View style={styles.itemlist}>
            <Text style={styles.globalfontwithbold}> </Text>
          </View>

          <View>
            {formData.parametersTableData.map((rowData, index) => (
              <React.Fragment key={index}>
                {/* Table Heading */}
                <View style={styles.tableDisplay}>
                  <View style={styles.row}>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}> No </Text>
                    </View>

                    <View style={styles.beadDia}>
                      <Text style={styles.globalfontwithbold}>
                        Bead Dia(mm)
                      </Text>
                    </View>

                    <View style={styles.power}>
                      <Text style={styles.globalfontwithbold}>Power(W)</Text>
                    </View>

                    <View style={styles.energy}>
                      <Text style={styles.globalfontwithbold}>Energy(J)</Text>
                    </View>

                    <View style={styles.pulseWidth}>
                      <Text style={styles.globalfontwithbold}>
                        Pulse Width(ms)
                      </Text>
                    </View>
                    <View style={styles.frequency}>
                      <Text style={styles.globalfontwithbold}>
                        Frequency(Hz)
                      </Text>
                    </View>

                    <View style={styles.pulseShape}>
                      <Text style={styles.globalfontwithbold}>Pulse Shape</Text>
                    </View>

                    <View style={styles.frequency}>
                      <Text style={styles.globalfontwithbold}>
                        Speed (mm/min)
                      </Text>
                    </View>
                    <View style={styles.gasFlow}>
                      <Text style={styles.globalfontwithbold}>
                        Gas Flow(LPM)
                      </Text>
                    </View>

                    <View style={styles.gasFlow}>
                      <Text style={styles.globalfontwithbold}>
                        Focus_Position
                      </Text>
                    </View>
                    <View style={styles.stepover}>
                      <Text style={styles.globalfontwithbold}>
                        Step Over(mm)
                      </Text>
                    </View>
                    <View style={styles.standOff}>
                      <Text style={styles.globalfontwithbold}>
                        Stand Off(mm)
                      </Text>
                    </View>

                    <View style={styles.layerThk}>
                      <Text style={styles.globalfontwithbold}>
                        Layer Thk(mm)
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableDataView}>
                  <View style={styles.row}>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithoutbold}>
                        {index + 1}
                      </Text>
                    </View>

                    <View style={styles.beadDia}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Bead_Dia}
                      </Text>
                    </View>

                    <View style={styles.power}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Power}
                      </Text>
                    </View>

                    <View style={styles.energy}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Energy}
                      </Text>
                    </View>

                    <View style={styles.pulseWidth}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Pulse_Width}
                      </Text>
                    </View>
                    <View style={styles.frequency}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Frequency}
                      </Text>
                    </View>

                    <View style={styles.pulseShape}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Pulse_Shape}
                      </Text>
                    </View>

                    <View style={styles.speed}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Speed}
                      </Text>
                    </View>
                    <View style={styles.gasFlow}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Gas_Flow}
                      </Text>
                    </View>
                    <View style={styles.stepover}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Focus_Position}
                      </Text>
                    </View>

                    <View style={styles.stepover}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Step_Over}
                      </Text>
                    </View>
                    <View style={styles.standOff}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Stand_Off}
                      </Text>
                    </View>

                    <View style={styles.layerThk}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.LayerThk}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.comments}>
                      Comments: {rowData.Comments}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
        <View>
          <Text style={{ marginLeft: "500px" }}>F58 Rev 0</Text>
        </View>
      </Page>
    );
  };

  return <Document>{renderContent()}</Document>;
};

export default SolidStatePdf;
