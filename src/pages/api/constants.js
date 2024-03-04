// let API = "http://localhost:3001";
// let API = "http://172.16.20.39:3001";
// let API = "http://20.204.144.125:3001";
// let API = "http://localhost:4001";
// let API = "http://192.168.1.25:4001";
// let API = "http://172.16.20.61:3001";

let API = process.env.REACT_APP_API_KEY;

export const endpoints = {
  //ORDERS
  getOrderData: `${API}/order/getorderdata`,
  getOrdDetailsData: `${API}/order/getorddetailsdata`,
  getSalesExecLists: `${API}/salesexecutives/allsalesexeclists`,
  getSalesIndiExecLists: `${API}/salesexecutives/indisalesexeclists`,
  getQuoteNosSent: `${API}/order/getqtnnossentdata`,
  getCombinedTaskSch: `${API}/order/getcombinedschdata`,
  getOrderScheduleData: `${API}/order/getorderscheduledata`,
  getSelectedSchDwgData: `${API}/order/getselectedschdwgdata`,
  getSalesTasksData: `${API}/order/getsalestasksdata`,
  getSelectedSalesTaskList: `${API}/order/getselectedsalestasklist`,
  getPrepareScheduleDetails: `${API}/order/preparescheduledetails`,
  saveCreateOrder: `${API}/order/savecreateorder`,
  getOrderStatusList: `${API}/order/getorderstatuslist`,
  getOrderListData: `${API}/order/getorderlistdata`,
  getOrderDetailsByOrdrNoAndType: `${API}/order/getOrderDetailsByOrdrNoAndType`,

  //------------------veeranna-----------------------
  getOrderDataforFindOrder: `${API}/order/getOrderDataforFindOrder`,
  PostNewSrlData: `${API}/order/postnewsrldata`,
  InsertNewSrlData: `${API}/OrderDetails/insertnewsrldata`,
  OrderDetailsTest: `${API}/OrderDetails/test`,
  GetBomData: `${API}/OrderDetails/getbomdata`,
  GetFindOldpartData: `${API}/OrderDetails/getfindoldpartdata`,
  loadStockPosition: `${API}/OrderDetails/loadStockPosition`,
  LoadArrival: `${API}/OrderDetails/LoadArrival`,
  LoadArrival2: `${API}/OrderDetails/LoadArrival2`,
  registerOrder: `${API}/order/registerOrder`,

  // profarma inv list...............
  getProfarmaMain: `${API}/profarmaInvList/getProfarmaMain`,
  getProfarmaDetails: `${API}/profarmaInvList/getProfarmaDetails`,
  postCreateInvoice: `${API}/profarmaInvList/postCreateInvoice`,
  postDeleteInvoice: `${API}/profarmaInvList/postDeleteInvoice`,
  // profarma inv form
  getTaxData: `${API}/profarmaInvForm/getTaxData`,
  getProfarmaFormMain: `${API}/profarmaInvForm/getProfarmaFormMain`,
  getProfarmaFormDetails: `${API}/profarmaInvForm/getProfarmaFormDetails`,
  getProfarmaFormTaxes: `${API}/profarmaInvForm/getProfarmaFormTaxes`,
  postSaveInvoice: `${API}/profarmaInvForm/postSaveInvoice`,
  postInvFormCreateInvoice: `${API}/profarmaInvForm/postInvFormCreateInvoice`,

  getCustomers: `${API}/customers/allcustomers`,
  getCustCodeName: `${API}/customers/allcustcodename`,
  getCustomerDets: `${API}/customers/getcustomer`,
  dueListCustomer: `${API}/customers/customerduelist`,
  overdueListCustomer: `${API}/customers/customeroverduelist`,
  dueSummaryCustomer: `${API}/customers/customerduessummary`,
  receiptsinfoCustomer: `${API}/customers/customerreceiptsinfo`,
  dLInvFormCustomer: `${API}/customers/customerdlinvform`,
  dLInvFormTaxDetsCustomer: `${API}/customers/customerdlinvformtaxdets`,
  receiptDetsCustomer: `${API}/customers/customerreceiptdets`,
  printDueReport: `${API}/customers/printduereport`,
  sendAttachmentMails: `${API}/mailer/sendDirectMail`,

  dxfupload: `${API}/file/uploaddxf`,
  getDwgFiles: `${API}/file/getdxfnames`,
  dxfCopy: `${API}/file/copydxf`,

  getStates: `${API}/states/allstates`,
  getStateCode: `${API}/states/getstatecode`,
  getStateName: `${API}/states/getstatename`,
  getCreditTerms: `${API}/creditterms/allcreditterms`,
  getMtrlSources: `${API}/mtrlsources/allmtrlsources`,
  getMtrlTypeLists: `${API}/mtrlgrades/allmtrltypelists`,
  getMtrlGrdTypes: `${API}/mtrlgrades/allmtrlgrdtypes`,
  getMtrlShapes: `${API}/mtrlgrades/allmtrlshapes`,
  getMtrlShapeGrds: `${API}/mtrlgrades/allmtrlshapegrades`,
  saveNewMtrlGrades: `${API}/mtrlgrades/savenewmtrlgrades`,
  getPackingLevels: `${API}/packinglevels/allpackinglevels`,
  getTaxDetails: `${API}/taxdetails/alltaxdetails`,

  getCustBOMParts: `${API}/customers/getcustomerbomparts`,
  assyPartCustomer: `${API}/customers/customerassy`,
  assyInsertPartCustomer: `${API}/customers/customerinsassembly`,
  getCustPartDetails: `${API}/customers/getcustpartdetails`,
  bomAssemblyParts: `${API}/customers/bomassemblyparts`,
  custbomAssemblyParts: `${API}/customers/custbomassemblyparts`,
  UpdateBOMAssembly: `${API}/customers/updatebomassembly`,
  DeleteBOMAssemblyPart: `${API}/customers/deletebomassmparts`,
  saveCustBOMParts: `${API}/customers/custbomparts`,
  chkAssyDupl: `${API}/customers/chkassydupl`,

  scheduleTasksCustomer: `${API}/customers/schtasksdets`,
  drawingsCustomer: `${API}/customers/customersdrawings`,
  ordStatusCustomer: `${API}/customers/orderstatus`,
  ordersCustomer: `${API}/customers/customerorders`,
  orderScheduleCustomer: `${API}/customers/orderschedule`,
  orderInvoicesCustomer: `${API}/customers/orderinvoices`,
  orderDetailsCustomer: `${API}/customers/orderdetails`,
  ordSchTasksCustomer: `${API}/customers/orderschtasks`,
  schDetsCustomer: `${API}/customers/schdets`,
  invDwgCustomer: `${API}/customers/orderinvdwg`,
  updateCustomer: `${API}/customers/customerupdate`,
  insertContactTeleNos: `${API}/customers/insertcontacttelenos`,
  getCustomerDetails: `${API}/customers/getcustomerdetails`,
  createCustomer: `${API}/customers/customer`,

  getCustomerContactDets: `${API}/customers/getcustomercontactdets`,
  getCustomerContactTeleDets: `${API}/customers/getcustomercontactteledets`,
  outStandingCustomers: `${API}/customers/customeroutstandings`,
  individualCustomer: `${API}/customers/outstandinginvoices`,
  pprDueListCustomer: `${API}/customers/pprcustomerduelist`,
  getCustDuesOverdues: `${API}/customers/customerduesoverdues`,

  mtrlStockCustomer: `${API}/customers/customermtrlstock`,
  mtrlReceiptsCustomer: `${API}/customers/customermtrlreceipts`,
  mtrlPartsReturnedCustomer: `${API}/customers/customermtrlpartsreturned`,
  mtrlScrapUnusedReturnedCustomer: `${API}/customers/customermtrlscrapUnusedreturned`,
  mtrlReceiptDetailsCustomer: `${API}/customers/customermtrlrectdetails`,
  getCustPartRects: `${API}/customers/getcustpartrects`,
  getMtrlRVList: `${API}/customers/getmtrlrvlist`,

  getMaterials: `${API}/materials/allmaterials`,
  getProcessLists: `${API}/processlists/allprocesslists`,
  getmtrldetsbymtrlcode: `${API}/materials/getmtrldetsbymtrlcode`,
  getMtrlGrades: `${API}/mtrlgrades/allmtrlgrades`,
  getmtrlgradbymaterial: `${API}/mtrlgrades/getmtrlgradbymaterial`,
  getToleranceTypes: `${API}/tolerancetypes/alltolerancetypes`,
  getInspectionLevels: `${API}/inspectionlevels/allinspectionlevels`,
  getMtrlGrade: `${API}/mtrlgrades/mtrlgrad`,
  getMaterialSpWt: `${API}/mtrlgrades/getmaterialspwt`,
  getTermsConditions: `${API}/termsconditions/alltermsconditions`,
  // Quotation

  createQuotation: `${API}/quotation/quotation`,
  getQuotations: `${API}/quotation/getquotations`,
  getQuotationList: `${API}/quotation/getquotationlist`,
  qtnStatusUpdate: `${API}/quotation/quotationstatusupdate`,
  getQtnRejnReasons: `${API}/quotation/getqtnrejnreasons`,
  getTaskListData: `${API}/quotation/gettasklistdata`,
  getTaskListDataByQtnNo: `${API}/quotation/gettasklistdatabyqtnno`,
  getProfileSumQty: `${API}/quotation/getqtnprofilesumqty`,
  getTaskMaterialRates: `${API}/quotation/gettaskmaterialrates`,
  getOperationMtrlRateList: `${API}/quotation/getoperationmtrlratelist`,
  getMtrlHandlingRates: `${API}/quotation/getmtrlhandlingrates`,
  getTaskProgrammingRates: `${API}/quotation/gettaskprogrammingrates`,
  getQtnProfileDetails: `${API}/quotation/getqtnprofiledetails`,
  getProfileDetbyQtnNo: `${API}/quotation/getprofiledetbyqtnno`,
  getTaskDetailsData: `${API}/quotation/gettaskdetailsdata`,
  getTaskDetailsDataByQtnNo: `${API}/quotation/gettaskdetailsdatabyqtnno`,
  UpdateImportedRatesProfileDetails: `${API}/quotation/updateimportedratesprofiledetails`,
  getTaskDetailsDataByQtn: `${API}/quotation/gettaskdetailsdatabyqtn`,
  getQtnPrintDetails: `${API}/quotation/getqtnprintdetails`,
  getQtntcDetails: `${API}/quotation/getqtntcdetails`,
  getQtnTaxDetails: `${API}/quotation/getqtntaxdetails`,
  getEstimateList: `${API}/quotation/getestimate`,
  getQtnPrintEstmnDets: `${API}/quotation/getqtnprintestmndets`,
  getQtnPrintFabEstmnDets: `${API}/quotation/getqtnprintfabestmndets`,
  getSelectedQuotation: `${API}/quotation/getselectedquotation`,
  getRevSelectedQuotation: `${API}/quotation/getrevselectedquotation`,
  getQuotationItems: `${API}/quotation/getquotationitems`,
  getTaskDetailsByTaskNo: `${API}/quotation/gettaskdetailsbytaskno`,
  UpdQtnTaskListJW: `${API}/quotation/updqtntasklistjw`,
  getQtnTaskListByTaskno: `${API}/quotation/getqtntasklistbytaskno`,
  saveQtnTaskListDetails: `${API}/quotation/saveqtntasklistdets`,
  saveProfileListdata: `${API}/quotation/saveprofilelistdata`,
  saveTaskDetails: `${API}/quotation/savetaskdetails`,
  saveQuotationItems: `${API}/quotation/quotationitemslist`,
  saveQtnTaxDetails: `${API}/quotation/saveqtntaxdetails`,
  SaveFabAssyParts: `${API}/quotation/savefabassyparts`,
  // SaveFabAssyPartsChild: `${API}/quotation/savefabassypartschild`,
  saveFab_SubAssy: `${API}/quotation/savefab_subassy`,
  //savefab_bom: `${API}/quotation/savefab_bom`,
  // savefab_subassy_operations: `${API}/quotation/savefab_subassy_operations`,

  updateQuotationList: `${API}/quotation/updatequotationlist`,
  UpdateProfileDetails: `${API}/quotation/updateprofiledetails`,
  updTaskGrpData: `${API}/quotation/updtaskgrpdata`,
  updateTaskDetailsData: `${API}/quotation/updatetaskdetailsdata`,
  updateQuotation: `${API}/quotation/updatequotation`,
  UpdateQtnTaskListDetails: `${API}/quotation/updateqtntasklistdets`,
  getqtnTasklistData: `${API}/quotation/getqtntasklistdata`,
  UpdateQtnTaskListMatDets: `${API}/quotation/updateQtnTaskListMatDets`,
  UpdateProfileJobCharges: `${API}/quotation/updateprofilejobcharges`,
  getMaterialHandlingRates: `${API}/quotation/getmtrlhandlingrates`,
  qtnItemsDeleteandSave: `${API}/quotation/qtnitemsdeleteandsave`,
  deleteQtnTaskDetails: `${API}/quotation/deleteqtntaskdetails`,
  deleteQtnTaskList: `${API}/quotation/deleteqtntasklist`,
  deleteQtnItemData: `${API}/quotation/deleteqtnitemdata`,
  crdeleteQtnItemData: `${API}/quotation/crdeleteqtnitemdata`,
  qtnItemsDeletedSave: `${API}/quotation/qtnitemsdeletedsave`,

  ReviseQuotation: `${API}/quotation/getquotationalldetails`,
  ChkQtnItems: `${API}/quotation/chkQtnItems`,
  getFabAssyParts: `${API}/quotation/getfabassyparts`,

  sendQuotationMail: `${API}/quotation/sendquotationmail`,

  getMtrlDetails: `${API}/materials/getmtrldetails`,
  getMtrlLocation: `${API}/materials/getmtrllocation`,

  getScheduleList: `${API}/sigmanc/getschedulelist`,
  getTaskScheduleDetails: `${API}/sigmanc/gettaskscheduledetails`,
  getCreateDxfWS: `${API}/sigmanc/getcreatedxfws`,
  getTaskProgramList: `${API}/sigmanc/gettaskprogramlist`,
  getNCTaskList: `${API}/sigmanc/getnctasklist`,
  getNCTaskParts: `${API}/sigmanc/getnctaskparts`,
  getProgramListData: `${API}/sigmanc/getprogramlistdata`,
  getMtrlAvailability: `${API}/sigmanc/getmtrlavailability`,
  updateProgramStatus: `${API}/sigmanc/updateprogramstatus`,
  getMachineDetails: `${API}/machine/allmachines`,

  getProdSchListDetails: `${API}/production/getprodschlistdetails`,
  getNCProgramListData: `${API}/production/getncprogramlistdata`,

  getOrderData: `${API}/order/getorderdata`,
  getOrdDetailsData: `${API}/order/getorddetailsdata`,
  getSalesExecLists: `${API}/salesexecutives/allsalesexeclists`,
  getSalesIndiExecLists: `${API}/salesexecutives/indisalesexeclists`,
  getQuoteNosSent: `${API}/order/getqtnnossentdata`,
  getCombinedTaskSch: `${API}/order/getcombinedschdata`,
  getOrderScheduleData: `${API}/order/getorderscheduledata`,
  getSelectedSchDwgData: `${API}/order/getselectedschdwgdata`,
  getSalesTasksData: `${API}/order/getsalestasksdata`,
  getSelectedSalesTaskList: `${API}/order/getselectedsalestasklist`,
  getPrepareScheduleDetails: `${API}/order/preparescheduledetails`,
  saveCreateOrder: `${API}/order/savecreateorder`,
  getbs_salestasks: `${API}/order/getbs_salestasks`,
  getbs_salestasklist: `${API}/order/getbs_salestasklist`,
  getPrepSchedulesData: `${API}/order/getprepareschedulesdata`,
  getCombSchedulelistData: `${API}/order/getcmbschedulelistdata`,
  AllotAndTaskCombinedSchedule: `${API}/order/allotandtaskcombinedschedule`,

  InsertCombinedSchedule: `${API}/order/insertcombinedschedule`,

  getPackScheduleDetails: `${API}/packinv/getpackingschedules`,
  getPackSchDetails: `${API}/packinv/getpackschdetails`,
  getExNotifDetails: `${API}/packinv/getexnotifications`,
  getPckScheduleDetails: `${API}/packinv/getpckscheduledetails`,

  getMtrlStocks: `${API}/stocks/getmtrlstocks`,
  getMtrlCodeStocks: `${API}/stocks/getmtrlcodestocks`,
  getMtrlStocksDets: `${API}/stocks/getmtrlstocksdets`,
  getStockArrivalSummary: `${API}/stocks/getstockarrivalsummary`,
  getStockArrivalReceipts: `${API}/stocks/getstockarrivalreceipts`,
  getStockArrivalReceiptList: `${API}/stocks/getstockarrivalreceiptList`,
  getSalesDispatchSummary: `${API}/stocks/getsalesdispatchsummary`,
  getSalesDispatchInvoices: `${API}/stocks/getsalesdispatchinvoices`,
  getSalesDispatchStockList: `${API}/stocks/getsalesdispatchstocklist`,

  getUserRoles: `${API}/user/getuserroles`,
  addUserRoles: `${API}/user/adduserroles`,
  updUserRoles: `${API}/user/upduserroles`,
  delUserRoles: `${API}/user/deluserroles`,
  getUserModules: `${API}/user/getusermodules`,
  addUserModules: `${API}/user/addusermodules`,
  getUserMenus: `${API}/user/getusermenus`,
  getUsers: `${API}/user/getusers`,
  addUserMenus: `${API}/user/addusermenus`,
  delUserMenus: `${API}/user/delusermenus`,
  saveUsers: `${API}/user/saveusers`,
  delUsers: `${API}/user/delusers`,
  loginAPI: `${API}/user/login`,
  saveMenuRoleMapping: `${API}/user/savemenurolemapping`,
  getRoleMenus: `${API}/user/getrolemenus`,

  getUnits: `${API}/units/allunits`,
  showAllUnits: `${API}/units/showallunits`,
  getUnitbyID: `${API}/units/getunitbyid`,

  getDlyRepSales: `${API}/accounts/salesinvoices`,
  getTaxSummary: `${API}/accounts/taxsummary`,
  getPaymentReceipts: `${API}/accounts/paymentreceipts`,
  getPaymentRectsDetails: `${API}/accounts/paymentrectdetails`,
  getPrdSummary: `${API}/accounts/prdsummary`,

  //Paking And Invoice
  getData: `${API}/gettest/getdata`,
  getCustomerData: `${API}/schedulelist/getallcustomers`,

  //ScheduleList Service
  getScheduleListData: `${API}/ScheduleList/getScheduleListData`,
  getScheduleListDwgData: `${API}/ScheduleList/getDwgTableData`,
  getScheduleListTaskandMaterial: `${API}/ScheduleList/getTaskandMterial`,

  //OpenSchedule Srvice

  getScheduleListgetFormDetails: `${API}/ScheduleList/getFormDeatils`,
  onClickShortClose: `${API}/ScheduleList/shortClose`,
  onClickSave: `${API}/ScheduleList/save`,
  onClickSuspend: `${API}/ScheduleList/suspendButton`,
  onClickCancel: `${API}/ScheduleList/onClickCancel`,
  onClickScheduled: `${API}/ScheduleList/ScheduleButton`,
  getSalesContact: `${API}/ScheduleList/getSalesContact`,
  onClickTask: `${API}/ScheduleList/taskOnclick`,
  onClickPerformance: `${API}/ScheduleList/onClickPerformce`,
  onClickFixtureOrder: `${API}/ScheduleList/fixtureOrder`,
  deleteScheduleList: `${API}/ScheduleList/deleteScheduleList`,

  //NCProgram Button
  onClickNCProgram: `${API}/NCProgram/getFormData`,
  getMachineList: `${API}/NCProgram/getMachines`,
  addNCProgram: `${API}/NCProgram/addProgram`,
  sendMtrlIssue: `${API}/NCProgram/sendMTrlIssue`,
  DeleteNCProgram: `${API}/NCProgram/DeleteNCProgram`,
  SaveButton: `${API}/NCProgram/ButtonSave`,
  getNCPrograms: `${API}/NCProgram/getPrograms`,
  getPartsData: `${API}/NCProgram/NCProgramPartsData`,

  //Production Schedule Creation
  CreateSchedule: `${API}/productionSchCreation/createSchedule`,
  shortcloseOrder: `${API}/productionSchCreation/shortCloseOrder`,
  //ShortClose to Recorded
  shortclosetoRecorded: `${API}/productionSchCreation/shortclosetoRecorded`,
  cancelOrder: `${API}/productionSchCreation/cancelOrder`,
  //Cancel to Recorded
  canceltoRecorded: `${API}/productionSchCreation/canceltoRecord`,
  suspendOrder: `${API}/productionSchCreation/suspendOrder`,
  scheduleListbasedOnScheduleType: `${API}/productionSchCreation/schedulelistbasedonScheduleType`,

  getScheduleListgetFormDetails: `${API}/ScheduleList/getFormDeatils`,
  onClickShortClose: `${API}/ScheduleList/shortClose`,
  onClickSave: `${API}/ScheduleList/save`,
  onClickSuspend: `${API}/ScheduleList/suspendButton`,
  onClickCancel: `${API}/ScheduleList/onClickCancel`,
  onClickScheduled: `${API}/ScheduleList/ScheduleButton`,

  // packingNote and Invoice
  getAllPNAndInvRegisterbyOrderNo: `${API}/orderPackingNoteAndInvoice/getAllPNAndInvRegisterbyOrderNo`,
  aboutInvoicePN: `${API}/orderPackingNoteAndInvoice/aboutInvoicePN`,
  getSetRateConsumerData: `${API}/orderPackingNoteAndInvoice/getSetRateConsumerData`,
  getPnInvTaxData: `${API}/orderPackingNoteAndInvoice/getTaxData`,
  getAllStates: `${API}/orderPackingNoteAndInvoice/getAllStates`,
  cancelPN: `${API}/orderPackingNoteAndInvoice/cancelPN`,
  updatePNProfileData: `${API}/orderPackingNoteAndInvoice/updatePNProfileData`,
  createInvoice: `${API}/orderPackingNoteAndInvoice/createInvoice`,
  updateRatesPN: `${API}/orderPackingNoteAndInvoice/updateRatesPN`,
  getScheduleListgetFormDetails: `${API}/ScheduleList/getFormDeatils`,
  onClickShortClose: `${API}/ScheduleList/shortClose`,
  onClickSave: `${API}/ScheduleList/save`,
  onClickSuspend: `${API}/ScheduleList/suspendButton`,
  onClickCancel: `${API}/ScheduleList/onClickCancel`,
  onClickScheduled: `${API}/ScheduleList/ScheduleButton`,
  getSalesContact: `${API}/ScheduleList/getSalesContact`,
  onClickTask: `${API}/ScheduleList/taskOnclick`,

  //NCProgram Button
  onClickNCProgram: `${API}/NCProgram/getFormData`,
  getMachineList: `${API}/NCProgram/getMachines`,
  addNCProgram: `${API}/NCProgram/addProgram`,
  sendMtrlIssue: `${API}/NCProgram/sendMTrlIssue`,
  DeleteNCProgram: `${API}/NCProgram/DeleteNCProgram`,
  SaveButton: `${API}/NCProgram/ButtonSave`,
  getNCPrograms: `${API}/NCProgram/getPrograms`,

  // running no
  getAndInsertRunningNo: `${API}/runningNo/getAndInsertRunningNo`,
  updateRunningNoBySrlType: `${API}/runningNo/updateRunningNoBySrlType`,

  // import qtn
  getQtnList: `${API}/orderDetails/getQtnList`,
  getQtnDataByQtnID: `${API}/orderDetails/getQtnDataByQtnID`,
};
