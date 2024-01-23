import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithNav from "./Layout/WithNav";
import Parentroute from "./Layout/Parentroute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import HomeOne from "./pages/HomeOne";
import UserRolesModules from "./pages/admin/userrolesmodules";
import CreateUsers from "./pages/admin/createusers";
import MenuRoleMapping from "./pages/admin/menurolemapping";
import SendMail from "./pages/sendmail/sendmails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoiceForm from "./pages/Sales/Packing&Invoicing/Menu/Inspection/InspectionPages/InvoiceForm";
import "react-toastify/dist/ReactToastify.css";

// Profile
import ProfileNewOrder from "./pages/Sales/Orders/Profile/NewOrder/ProfileNewOrder";
import FindOrder from "./pages/Sales/Orders/Profile/Find Order/FindOrder";
import ImportExcelForm from "./pages/Sales/Orders/Profile/Find Order/Body Tabs/OrderDetailsTab/ButtonTabs/ImportExcelForm";
import ImportQtn from "./pages/Sales/Orders/Profile/Find Order/Body Tabs/OrderDetailsTab/ButtonTabs/ImportQtn";
import ScheduleCreationForm from "./pages/Sales/Orders/Profile/Find Order/ScheduleCreationForm";
import NewOrderSerial from "./pages/Sales/Orders/Profile/Find Order/Body Tabs/OrderDetailsTab/NewOrderSerial";
import FindScheduleForm from "./pages/Sales/Orders/Profile/FindSchedule/FindScheduleForm";
import FindSchedule from "./pages/Sales/Orders/Profile/FindSchedule/FindSchedule";
import Created from "./pages/Sales/Orders/Profile/OrderList/Created";
import Recorded from "./pages/Sales/Orders/Profile/OrderList/Recorded";
import Processing from "./pages/Sales/Orders/Profile/OrderList/Processing";
import Completed from "./pages/Sales/Orders/Profile/OrderList/Completed";
import Packed from "./pages/Sales/Orders/Profile/OrderList/Packed";
import Dispatched from "./pages/Sales/Orders/Profile/OrderList/Dispatched";
import All from "./pages/Sales/Orders/Profile/OrderList/All";
import Produced from "./pages/Sales/Orders/Profile/OrderList/Produced";
import ProfamaInvoiceForm from "./pages/Sales/Orders/Profile/Find Order/Body Tabs/ProfarmaInvoiceListTab/ProfamaInvoiceForm";
import NCProgram from "./pages/Sales/Orders/Profile/FindSchedule/NCProgram";
import EditDXF from "./pages/Sales/Orders/Profile/Find Order/Body Tabs/OrderDetailsTab/ButtonTabs/EditDXF";
import Ready from "./pages/Sales/Orders/Profile/FixturesOrderList/Ready";
import HandedOver from "./pages/Sales/Orders/Profile/FixturesOrderList/HandedOver";
import FixturesRecorded from "./pages/Sales/Orders/Profile/FixturesOrderList/FixturesRecorded";
import FixturesProcessing from "./pages/Sales/Orders/Profile/FixturesOrderList/FixturesProcessing";
import FixturesCompleted from "./pages/Sales/Orders/Profile/FixturesOrderList/FixturesCompleted";
import InternalRecorded from "./pages/Sales/Orders/Profile/InternalOrderList/InternalRecorded";
import InternalProcessing from "./pages/Sales/Orders/Profile/InternalOrderList/InternalProcessing";
import InternalCompleted from "./pages/Sales/Orders/Profile/InternalOrderList/InternalCompleted";
import InternalReady from "./pages/Sales/Orders/Profile/InternalOrderList/InternalReady";
import InternalHandedOver from "./pages/Sales/Orders/Profile/InternalOrderList/InternalHandedOver";

// Combined Schedule
import Create from "./pages/Sales/Orders/Combined Schedules/Job Work/Create/Create";
import CombinedScheduleList from "./pages/Sales/Orders/Combined Schedules/Job Work/ScheduleList/CombinedScheduleList";
import CombinedScheduleDetailsForm from "./pages/Sales/Orders/Combined Schedules/Job Work/ScheduleList/CombinedScheduleDetailsForm";
import Open from "./pages/Sales/Orders/Combined Schedules/Job Work/Open/Open";

import SalesCreate from "./pages/Sales/Orders/Combined Schedules/Sales/Create/SalesCreate";
import SalesOpen from "./pages/Sales/Orders/Combined Schedules/Sales/Open/SalesOpen";
import SalesCombinedScheduleList from "./pages/Sales/Orders/Combined Schedules/Sales/ScheduleList/SalesCombinedScheduleList";
import SalesCombinedScheduleDetailsForm from "./pages/Sales/Orders/Combined Schedules/Sales/ScheduleList/SalesCombinedScheduleDetailsForm";

// Service
import ServiceNewOrder from "./pages/Sales/Orders/Service/NewOrder/ServiceNewOrder";
import ServiceFindOrder from "./pages/Sales/Orders/Service/FindOrder/ServiceFindOrder";

import ServiceAll from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceAll";
import ServiceCompleted from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceCompleted";
import ServiceCreated from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceCreated";
import ServiceDispatched from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceDispatched";
import ServicePacked from "./pages/Sales/Orders/Service/OrderList/Menus/ServicePacked";
import ServiceProcessing from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceProcessing";
import ServiceProduced from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceProduced";
import ServiceRecorded from "./pages/Sales/Orders/Service/OrderList/Menus/ServiceRecorded";

import ServiceScheduleCreationForm from "./pages/Sales/Orders/Service/ScheduleCreationForm/ServiceScheduleCreationForm";
import ServiceNewOrderSerial from "./pages/Sales/Orders/Service/ScheduleCreationForm/BodyTabs/DrawingOrderDetailsTabs/ServiceNewOrderSerial";
import ServiceNCProgram from "./pages/Sales/Orders/Service/ScheduleCreationForm/BodyTabs/ScheduleList/ServiceNCProgram";
import ServiceOrderSchedule from "./pages/Sales/Orders/Service/ScheduleCreationForm/BodyTabs/ScheduleList/ServiceOpenSchedule";
import ServiceImportQtn from "./pages/Sales/Orders/Service/ScheduleCreationForm/BodyTabs/Buttons/ServiceImportQtn";
import ServiceEditDxf from "./pages/Sales/Orders/Service/ScheduleCreationForm/BodyTabs/Buttons/ServiceEditDxf";

// Fabrication
import FabNewOrder from "./pages/Sales/Orders/Fabrication/NewOrder/FabNewOrder";
import FabFindOrder from "./pages/Sales/Orders/Fabrication/FindOrder/FabFindOrder";
import FabCreated from "./pages/Sales/Orders/Fabrication/OrderList/FabCreated";
import FabProcessing from "./pages/Sales/Orders/Fabrication/OrderList/FabProcessing";
import FabCompleted from "./pages/Sales/Orders/Fabrication/OrderList/FabCompleted";
import FabProduced from "./pages/Sales/Orders/Fabrication/OrderList/FabProduced";
import FabPacked from "./pages/Sales/Orders/Fabrication/OrderList/FabPacked";
import FabDispatched from "./pages/Sales/Orders/Fabrication/OrderList/FabDispatched";
import FabAll from "./pages/Sales/Orders/Fabrication/OrderList/FabAll";
import FabRecorded from "./pages/Sales/Orders/Fabrication/OrderList/FabRecorded";
import FabScheduleCreationForm from "./pages/Sales/Orders/Fabrication/ScheduleCreationForm/FabScheduleCreationForm";
import FabNewOrderSerial from "./pages/Sales/Orders/Fabrication/ScheduleCreationForm/BodyTabs/DrawingOrderDetailsTabs/FabNewOrderSerial";
import FabNCProgram from "./pages/Sales/Orders/Fabrication/ScheduleCreationForm/BodyTabs/ScheduleList/FabNCProgram";
import FabOrderSchedule from "./pages/Sales/Orders/Fabrication/ScheduleCreationForm/BodyTabs/ScheduleList/FabOpenSchedule";
import FabImportQtn from "./pages/Sales/Orders/Fabrication/ScheduleCreationForm/BodyTabs/Buttons/FabImportQtn";
import FabEditDxf from "./pages/Sales/Orders/Fabrication/ScheduleCreationForm/BodyTabs/Buttons/FabEditDxf";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route element={<Login />} path="/" />

        <Route path="/home" element={<Home />} />
        <Route path="/salesHome" element={<HomeOne />} />

        <Route element={<WithNav />}>
          <Route path="/Orders" element={<Parentroute />}>
            <Route index={true} />
            <Route path="Profile">
              <Route index={true} />
              <Route path="NewOrder" element={<ProfileNewOrder />} />
              <Route path="FindOrder" element={<FindOrder />} />
              <Route
                path="FindOrder/ScheduleCreationForm"
                element={<ScheduleCreationForm />}
              />
              <Route
                path="FindOrder/ImportExcelForm"
                element={<ImportExcelForm />}
              />
              <Route path="FindOrder/ImportQtn" element={<ImportQtn />} />
              <Route path="FindOrder/EditDXF" element={<EditDXF />} />
              <Route
                path="FindOrder/NewOrderSerial"
                element={<NewOrderSerial />}
              />
              <Route
                path="FindOrder/ProfamaInvoiceForm"
                element={<ProfamaInvoiceForm />}
              />

              <Route path="FindScheduleForm" element={<FindScheduleForm />} />
              <Route path="FindSchedule" element={<FindSchedule />} />
              <Route path="FindSchedule/NCProgram" element={<NCProgram />} />

              <Route path="OrderList">
                <Route index={true} />
                <Route path="Created" element={<Created />} />
                <Route path="Recorded" element={<Recorded />} />
                <Route path="Processing" element={<Processing />} />
                <Route path="Completed" element={<Completed />} />
                <Route path="Produced" element={<Produced />} />
                <Route path="Packed" element={<Packed />} />
                <Route path="Dispatched" element={<Dispatched />} />
                <Route path="All" element={<All />} />
              </Route>

              <Route path="FixturesOrderList">
                <Route index={true} />
                <Route path="Recorded" element={<FixturesRecorded />} />
                <Route path="Processing" element={<FixturesProcessing />} />
                <Route path="Completed" element={<FixturesCompleted />} />
                <Route path="Ready" element={<Ready />} />
                <Route path="HandedOver" element={<HandedOver />} />
              </Route>

              <Route path="InternalOrderList">
                <Route index={true} />
                <Route path="Recorded" element={<InternalRecorded />} />
                <Route path="Processing" element={<InternalProcessing />} />
                <Route path="Completed" element={<InternalCompleted />} />
                <Route path="Ready" element={<InternalReady />} />
                <Route path="HandedOver" element={<InternalHandedOver />} />
              </Route>
            </Route>

            <Route path="Service">
              <Route path="NewOrder" element={<ServiceNewOrder />} />
              <Route
                path="ScheduleCreationForm"
                element={<ServiceScheduleCreationForm />}
              />

              <Route path="FindOrder" element={<ServiceFindOrder />} />
              <Route path="OrderList">
                <Route path="All" element={<ServiceAll />} />
                <Route path="Completed" element={<ServiceCompleted />} />
                <Route path="Created" element={<ServiceCreated />} />
                <Route path="Dispatched" element={<ServiceDispatched />} />
                <Route path="Packed" element={<ServicePacked />} />
                <Route path="Processing" element={<ServiceProcessing />} />
                <Route path="Produced" element={<ServiceProduced />} />
                <Route path="Recorded" element={<ServiceRecorded />} />
              </Route>
              <Route
                path="NewOrderSerial"
                element={<ServiceNewOrderSerial />}
              />
              <Route path="NCProgram" element={<ServiceNCProgram />} />
              <Route path="OrderSchedule" element={<ServiceOrderSchedule />} />
              <Route path="ImportQtn" element={<ServiceImportQtn />} />
              <Route path="EditDxf" element={<ServiceEditDxf />} />
            </Route>

            <Route path="Fabrication">
              <Route path="NewOrder" element={<FabNewOrder />} />
              <Route
                path="ScheduleCreationForm"
                element={<FabScheduleCreationForm />}
              />

              <Route path="FindOrder" element={<FabFindOrder />} />

              <Route path="OrderList/Created" element={<FabCreated />} />
              <Route path="OrderList/Processing" element={<FabProcessing />} />
              <Route path="OrderList/Completed" element={<FabCompleted />} />
              <Route path="OrderList/Produced" element={<FabProduced />} />
              <Route path="OrderList/Packed" element={<FabPacked />} />
              <Route path="OrderList/Dispatched" element={<FabDispatched />} />
              <Route path="OrderList/All" element={<FabAll />} />
              <Route path="OrderList/Recorded" element={<FabRecorded />} />
              <Route path="NewOrderSerial" element={<FabNewOrderSerial />} />
              <Route path="NCProgram" element={<FabNCProgram />} />
              <Route path="OrderSchedule" element={<FabOrderSchedule />} />
              <Route path="ImportQtn" element={<FabImportQtn />} />
              <Route path="EditDxf" element={<FabEditDxf />} />
            </Route>

            <Route path="CombinedSchedules">
              {/* Jobwork route */}
              <Route path="JobWork">
                <Route path="Create" element={<Create />} />
                <Route path="Open" element={<Open />} />
                <Route path="ScheduleList">
                  <Route
                    path="Order"
                    element={<CombinedScheduleList />}
                  ></Route>
                  <Route
                    path="ScheduleDetails"
                    element={<CombinedScheduleDetailsForm />}
                  />
                  <Route
                    path="Closed"
                    element={<CombinedScheduleList />}
                  ></Route>
                  <Route
                    path="ScheduleDetails"
                    element={<CombinedScheduleDetailsForm />}
                  />
                </Route>
              </Route>

              {/* Sales route */}
              <Route path="Sales">
                <Route path="Create" element={<SalesCreate />} />
                <Route path="Open" element={<SalesOpen />} />
                <Route path="ScheduleList">
                  <Route
                    path="Order"
                    element={<SalesCombinedScheduleList />}
                  ></Route>
                  <Route
                    path="ScheduleDetails"
                    element={<SalesCombinedScheduleDetailsForm />}
                  />

                  <Route
                    path="Closed"
                    element={<SalesCombinedScheduleList />}
                  ></Route>
                  <Route
                    path="ScheduleDetails"
                    element={<SalesCombinedScheduleDetailsForm />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
