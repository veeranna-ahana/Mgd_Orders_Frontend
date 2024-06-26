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

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
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
    width: "350px",
    border: 1,
    marginLeft: "10px",
    height: "140px",
    marginTop: "10px",
  },
  subdetailsshipping: {
    width: "220px",
    borderRight: 1,
    borderTop: 1,
    borderBottom: 1,
    height: "140px",
    marginTop: "10px",
  },
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
    width: "145px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideheadingdata: {
    width: "140px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideheadingdata2: {
    width: "139.5px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideHead1: {
    width: "149px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideHeadData1: {
    width: "100px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideHead2: {
    width: "100px",
    borderBottom: 1,
    borderRight: 1,
  },
  sideHeadData2: {
    width: "233px",
    borderBottom: 1,
    borderRight: 1,
  },
  flexi: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  tableContainer1: {
    width: "330px",
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
    // borderRight: 1,
    borderLeft: 1,
    marginLeft: "10px",
  },
  drawingname: {
    width: "100px",
    textAlign: "center",
    borderRight: 1,
    padding: "1px",
    borderBottom: 1,
  },
  drawingname01: {
    width: "100px",
    textAlign: "center",
    borderRight: 1,
    padding: "1px",
    // borderBottom: 1,
  },
  comments: {
    height: "150px",
    width: "569px",
    borderBottom: 1,
    borderRight: 1,
    marginLeft: "0px",
    fontSize: "9px",
    marginTop: "0px",
    padding: 1,
  },
  quantity: {
    width: "184px",
    borderRight: 1,
    padding: "1px",
    textAlign: "center",
    borderBottom: 1,
  },
  quantity01: {
    width: "195px",
    borderRight: 1,
    padding: "1px",
    textAlign: "center",
    borderBottom: 1,
  },
  Material: {
    width: "90px",
    textAlign: "center",
    borderRight: 1,
    padding: "1px",
    borderBottom: 1,
  },
  pkg: {
    width: "100px",
    textAlign: "center",
    borderRight: 1,
    borderBottom: 1,
    padding: "1px",
  },
  insp: {
    width: "100px",
    borderRight: 1,
    textAlign: "center",
    padding: "1px",
    borderBottom: 1,
  },
  qty: {
    width: "70px",
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
    height: "330px",
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
  tableData01: {
    fontSize: "8px",
    fontFamily: "Helvetica-Bold",
    width: "285px",
    borderRight: 1,
    borderBottom: 1,
    // borderLeft: 1,
    // marginLeft: "5px",
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
    // borderLeft: 1,
    // marginLeft: "5px",
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

const COForm = ({ formData }) => {
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
                      marginLeft: "120px",
                      textDecoration: "underline",
                    },
                  ]}
                >
                  Magod Laser Machining Pvt Ltd
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.tableContainerMain]}>
          <View style={[styles.itemlist, { borderTop: 1 }]}>
            <Text style={[styles.globalfontwithbold, { padding: 3 }]}>
              Laser Welding Job Parameter Sheet - CO2 Laser
            </Text>
          </View>
          <View style={styles.tableDisplay}>
            <View style={styles.row}>
              <View style={styles.drawingname}>
                <Text style={styles.globalfontwithbold}>Date </Text>
              </View>
              <View style={styles.quantity}>
                <Text style={styles.globalfontwithoutbold}>
                  {formData.taskDate}
                </Text>
              </View>
              <View style={styles.Material}>
                <Text style={styles.globalfontwithbold}>Schedule No</Text>
              </View>
              <View style={styles.quantity01}>
                <Text style={styles.globalfontwithoutbold}>
                  {formData.taskNo}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.drawingname}>
                <Text style={styles.globalfontwithbold}>Machine</Text>
              </View>
              <View style={styles.quantity}>
                <Text style={styles.globalfontwithoutbold}>
                  {formData.machine}
                </Text>
              </View>
              <View style={styles.Material}>
                <Text style={styles.globalfontwithbold}>nT</Text>
              </View>
              <View style={styles.quantity01}>
                <Text style={styles.globalfontwithoutbold}>{formData.nt}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.drawingname}>
                <Text style={styles.globalfontwithbold}>Joint</Text>
              </View>
              <View style={styles.quantity}>
                <Text style={styles.globalfontwithoutbold}>
                  {formData.joint}
                </Text>
              </View>
              <View style={styles.Material}>
                <Text style={styles.globalfontwithbold}>Operator</Text>
              </View>
              <View style={styles.quantity01}>
                <Text style={styles.globalfontwithoutbold}>
                  {formData.operator}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.tableData01}>Material</Text>
              <Text style={styles.tableData03}>Thickness</Text>
            </View>

            {formData.materialTableData?.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.tableInput01}>{item.Material}</Text>
                <Text style={styles.tableInput03}>{item.Thickness}</Text>
              </View>
            ))}

            <View>
              {formData.parametersTableData.map((rowData, index) => (
                <React.Fragment key={index}>
                  {/* Table Row */}
                  <View style={styles.row}>
                    <View style={styles.drawingname01}>
                      <Text style={styles.globalfontwithbold}>Sr No</Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>Gas Type</Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Gas_Type}
                      </Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>
                        Flow/Pressure
                      </Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Flow_Pressure}
                      </Text>
                    </View>
                  </View>

                  {/* Beam Dia and Focus */}
                  <View style={styles.row}>
                    <View style={styles.drawingname01}>
                      <Text style={styles.globalfontwithbold}>{index + 1}</Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>
                        Beam Dia(mm)
                      </Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Bead_Dia}
                      </Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>Focus</Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Focus}
                      </Text>
                    </View>
                  </View>

                  {/* Power and Speed */}
                  <View style={styles.row}>
                    <View style={styles.drawingname01}>
                      <Text style={styles.globalfontwithbold}></Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>Power(W)</Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Power}
                      </Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>
                        Speed(mm/min)
                      </Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Speed}
                      </Text>
                    </View>
                  </View>

                  {/* Gap and Frequency */}
                  <View style={styles.row}>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}></Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>Gap(mm)</Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Gap}
                      </Text>
                    </View>
                    <View style={styles.drawingname}>
                      <Text style={styles.globalfontwithbold}>
                        Frequency(Hz)
                      </Text>
                    </View>
                    <View style={styles.quantity}>
                      <Text style={styles.globalfontwithoutbold}>
                        {rowData.Frequency}
                      </Text>
                    </View>
                  </View>

                  {/* Comments */}
                  <View style={styles.row}>
                    {/* <View style={styles.comments}>
                      <Text style={styles.globalfontwithbold}>Comments:</Text>
                    </View>
                    */}
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
        </View>
      </Page>
    );
  };

  return <Document>{renderContent()}</Document>;
};

export default COForm;
