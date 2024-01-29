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
import "react-toastify/dist/ReactToastify.css";

// Profile
import ProfileNewOrder from "./pages/Sales/Orders/Menus/Profile/NewOrder/ProfileNewOrder";
import FindOrder from "./pages/Sales/Orders/Menus/Profile/Find Order/FindOrder";
import ImportExcelForm from "./pages/Sales/Orders/Menus/Profile/Find Order/Body Tabs/OrderDetailsTab/ButtonTabs/ImportExcelForm";
import ImportQtn from "./pages/Sales/Orders/Menus/Profile/Find Order/Body Tabs/OrderDetailsTab/ButtonTabs/ImportQtn";
// import ScheduleCreationForm from "./pages/Sales/Orders/ZComponents/ScheduleCreationForm";
import NewOrderSerial from "./pages/Sales/Orders/Menus/Profile/Find Order/Body Tabs/OrderDetailsTab/NewOrderSerial";
import FindScheduleForm from "./pages/Sales/Orders/Menus/Profile/FindSchedule/FindScheduleForm";
import FindSchedule from "./pages/Sales/Orders/Menus/Profile/FindSchedule/FindSchedule";

import ProfileCreated from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileCreated";
import ProfileRecorded from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileRecorded";
import ProfileProcessing from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileProcessing";
import ProfileCompleted from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileCompleted";
import ProfileProduced from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileProduced";
import ProfilePacked from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfilePacked";
import ProfileDispatched from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileDispatched";
import ProfileAll from "./pages/Sales/Orders/Menus/Profile/OrderList/ProfileAll";

import ProfamaInvoiceForm from "./pages/Sales/Orders/Menus/Profile/Find Order/Body Tabs/ProfarmaInvoiceListTab/ProfamaInvoiceForm";
import NCProgram from "./pages/Sales/Orders/Menus/Profile/FindSchedule/NCProgram";
import EditDXF from "./pages/Sales/Orders/Menus/Profile/Find Order/Body Tabs/OrderDetailsTab/ButtonTabs/EditDXF";
import Ready from "./pages/Sales/Orders/Menus/Profile/FixturesOrderList/Ready";
import HandedOver from "./pages/Sales/Orders/Menus/Profile/FixturesOrderList/HandedOver";
import FixturesRecorded from "./pages/Sales/Orders/Menus/Profile/FixturesOrderList/FixturesRecorded";
import FixturesProcessing from "./pages/Sales/Orders/Menus/Profile/FixturesOrderList/FixturesProcessing";
import FixturesCompleted from "./pages/Sales/Orders/Menus/Profile/FixturesOrderList/FixturesCompleted";
import InternalRecorded from "./pages/Sales/Orders/Menus/Profile/InternalOrderList/InternalRecorded";
import InternalProcessing from "./pages/Sales/Orders/Menus/Profile/InternalOrderList/InternalProcessing";
import InternalCompleted from "./pages/Sales/Orders/Menus/Profile/InternalOrderList/IntCompleted";
import InternalReady from "./pages/Sales/Orders/Menus/Profile/InternalOrderList/InternalReady";
import InternalHandedOver from "./pages/Sales/Orders/Menus/Profile/InternalOrderList/InternalHandedOver";

// Combined Schedule
import Create from "./pages/Sales/Orders/Menus/Combined Schedules/Job Work/Create/Create";
import CombinedScheduleList from "./pages/Sales/Orders/Menus/Combined Schedules/Job Work/ScheduleList/CombinedScheduleList";
import CombinedScheduleDetailsForm from "./pages/Sales/Orders/Menus/Combined Schedules/Job Work/ScheduleList/CombinedScheduleDetailsForm";
import Open from "./pages/Sales/Orders/Menus/Combined Schedules/Job Work/Open/Open";

import SalesCreate from "./pages/Sales/Orders/Menus/Combined Schedules/Sales/Create/SalesCreate";
import SalesOpen from "./pages/Sales/Orders/Menus/Combined Schedules/Sales/Open/SalesOpen";
import SalesCombinedScheduleList from "./pages/Sales/Orders/Menus/Combined Schedules/Sales/ScheduleList/SalesCombinedScheduleList";
import SalesCombinedScheduleDetailsForm from "./pages/Sales/Orders/Menus/Combined Schedules/Sales/ScheduleList/SalesCombinedScheduleDetailsForm";

// Service
import ServiceNewOrder from "./pages/Sales/Orders/Menus/Service/NewOrder/ServiceNewOrder";
import ServiceFindOrder from "./pages/Sales/Orders/Menus/Service/FindOrder/ServiceFindOrder";

import ServiceAll from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceAll";
import ServiceCompleted from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceCompleted";
import ServiceCreated from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceCreated";
import ServiceDispatched from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceDispatched";
import ServicePacked from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServicePacked";
import ServiceProcessing from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceProcessing";
import ServiceProduced from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceProduced";
import ServiceRecorded from "./pages/Sales/Orders/Menus/Service/OrderList/Menus/ServiceRecorded";

import ServiceScheduleCreationForm from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/ServiceScheduleCreationForm";
import ServiceNewOrderSerial from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/BodyTabs/DrawingOrderDetailsTabs/ServiceNewOrderSerial";
import ServiceNCProgram from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/BodyTabs/ScheduleList/ServiceNCProgram";
import ServiceOrderSchedule from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/BodyTabs/ScheduleList/ServiceOpenSchedule";
import ServiceImportQtn from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/BodyTabs/Buttons/ServiceImportQtn";
import ServiceEditDxf from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/BodyTabs/Buttons/ServiceEditDxf";

// Fabrication
import FabNewOrder from "./pages/Sales/Orders/Menus/Fabrication/NewOrder/FabNewOrder";
import FabFindOrder from "./pages/Sales/Orders/Menus/Fabrication/FindOrder/FabFindOrder";
import FabCreated from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabCreated";
import FabProcessing from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabProcessing";
import FabCompleted from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabCompleted";
import FabProduced from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabProduced";
import FabPacked from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabPacked";
import FabDispatched from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabDispatched";
import FabAll from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabAll";
import FabRecorded from "./pages/Sales/Orders/Menus/Fabrication/OrderList/FabRecorded";
import FabScheduleCreationForm from "./pages/Sales/Orders/Menus/Fabrication/ScheduleCreationForm/FabScheduleCreationForm";
import FabNewOrderSerial from "./pages/Sales/Orders/Menus/Fabrication/ScheduleCreationForm/BodyTabs/DrawingOrderDetailsTabs/FabNewOrderSerial";
import FabNCProgram from "./pages/Sales/Orders/Menus/Fabrication/ScheduleCreationForm/BodyTabs/ScheduleList/FabNCProgram";
import FabOrderSchedule from "./pages/Sales/Orders/Menus/Fabrication/ScheduleCreationForm/BodyTabs/ScheduleList/FabOpenSchedule";
import FabImportQtn from "./pages/Sales/Orders/Menus/Fabrication/ScheduleCreationForm/BodyTabs/Buttons/FabImportQtn";
import FabEditDxf from "./pages/Sales/Orders/Menus/Fabrication/ScheduleCreationForm/BodyTabs/Buttons/FabEditDxf";
import ProfileScheduleCreationForm from "./pages/Sales/Orders/Menus/Profile/ScheduleCreationForm/ProfileScheduleCreationForm";
import { QuotationProvider } from "./context/QuotationContext";
import { OrderProvider } from "./context/OrderContext";
import ServiceOpenSchedule from "./pages/Sales/Orders/Menus/Service/ScheduleCreationForm/BodyTabs/ScheduleList/ServiceOpenSchedule";
function App() {
  return (
    <BrowserRouter>
      <QuotationProvider>
        <OrderProvider>
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
                    path="ScheduleCreationForm"
                    element={<ProfileScheduleCreationForm />}
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

                  <Route
                    path="FindScheduleForm"
                    element={<FindScheduleForm />}
                  />
                  <Route path="FindSchedule" element={<FindSchedule />} />
                  <Route
                    path="FindSchedule/NCProgram"
                    element={<NCProgram />}
                  />

                  <Route path="OrderList">
                    <Route index={true} />
                    <Route path="Created" element={<ProfileCreated />} />
                    <Route path="Recorded" element={<ProfileRecorded />} />
                    <Route path="Processing" element={<ProfileProcessing />} />
                    <Route path="Completed" element={<ProfileCompleted />} />
                    <Route path="Produced" element={<ProfileProduced />} />
                    <Route path="Packed" element={<ProfilePacked />} />
                    <Route path="Dispatched" element={<ProfileDispatched />} />
                    <Route path="All" element={<ProfileAll />} />
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
                  <Route
                    path="ProfamaInvoiceForm"
                    element={<ProfamaInvoiceForm />}
                  />
                  <Route
                    path="ServiceOpenSchedule"
                    element={<ServiceOpenSchedule />}
                  />

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
                  <Route
                    path="OrderSchedule"
                    element={<ServiceOrderSchedule />}
                  />
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
                  <Route
                    path="OrderList/Processing"
                    element={<FabProcessing />}
                  />
                  <Route
                    path="OrderList/Completed"
                    element={<FabCompleted />}
                  />
                  <Route path="OrderList/Produced" element={<FabProduced />} />
                  <Route path="OrderList/Packed" element={<FabPacked />} />
                  <Route
                    path="OrderList/Dispatched"
                    element={<FabDispatched />}
                  />
                  <Route path="OrderList/All" element={<FabAll />} />
                  <Route path="OrderList/Recorded" element={<FabRecorded />} />
                  <Route
                    path="NewOrderSerial"
                    element={<FabNewOrderSerial />}
                  />
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
        </OrderProvider>
      </QuotationProvider>
    </BrowserRouter>
  );
}

export default App;
