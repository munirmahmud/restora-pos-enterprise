import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SystemMenu from './components/partials/SystemMenu';
import { ContextData } from './contextApi';
import BankBook from './pages/accounts/BankBook';
import Cash from './pages/accounts/Cash';
import CashBook from './pages/accounts/CashBook';
import ChartOfAccounts from './pages/accounts/ChartOfAccounts';
import ContraVoucher from './pages/accounts/ContraVoucher';
import CreditVoucher from './pages/accounts/CreditVoucher';
import DebitVoucher from './pages/accounts/DebitVoucher/index';
import FinancialYear from './pages/accounts/FinancialYear';
import FinancialYearEnding from './pages/accounts/FinancialYearEnding';
import Journal from './pages/accounts/Journal';
import OpeningBalance from './pages/accounts/OpeningBalance';
import Supplier from './pages/accounts/Supplier';
import VoucherApproval from './pages/accounts/VoucherApproval';
import VoucherReport from './pages/accounts/VoucherReport';
import Contact from './pages/Contact';
import Currency from './pages/Currency';
import DashBoard from './pages/DashBoard';
import AddAddons from './pages/foodManagement/manageAddons/AddAddons';
import AddonsAssignList from './pages/foodManagement/manageAddons/AddonsAssignList';
import AddonsList from './pages/foodManagement/manageAddons/AddonsList';
import AddCategory from './pages/foodManagement/manageCategory/AddCategory';
import CategoryList from './pages/foodManagement/manageCategory/CategoryList';
import AddFood from './pages/foodManagement/manageFood/AddFood';
import FoodAvailability from './pages/foodManagement/manageFood/FoodAvailability';
import FoodList from './pages/foodManagement/manageFood/FoodList';
import FoodVariant from './pages/foodManagement/manageFood/FoodVariant';
import MenuType from './pages/foodManagement/manageFood/MenuType';
import Home from './pages/Home';
import AddEmployee from './pages/hrm/AddEmployee';
import Designation from './pages/hrm/Designation';
import ManageEmployee from './pages/hrm/ManageEmployee/index';
import ManageEmployeeSalary from './pages/hrm/ManageEmployeeSalary/index';
import Language from './pages/Language/';
import OnGoingOrder from './pages/OnGoingOrder';
import ItemSalesReport from './pages/report/ItemSalesReport';
import SalesReport from './pages/report/SalesReport';
import ApplicationSettings from './pages/settings/ApplicationSettings';
import TodaysOrder from './pages/TodaysOrder';

export default function App() {
  window.get_settings.send('get_settings', { status: true });

  const [cartItems, setCartItems] = useState([]);
  const [reRenderOnSettings, setReRenderOnSettings] = useState(false);

  const [settings, setSettings] = useState({
    appStatus: 'free',
    site_align: 'ltr',
    theme: 'light',
    powerbytxt: '© Copyright Restora POS',
    discountrate: 0,
    servicecharge: 0,
    vat: 0,
  });

  const [languageData, setLanguageData] = useState(null);

  useEffect(() => {
    getDataFromDatabase('get_settings_response', window.get_settings).then(
      (result) => {
        setSettings({
          ...settings,
          ...result,
          currency_icon: result.currency_icon ? result.currency_icon : '$',
        });
      }
    );
  }, [reRenderOnSettings]);

  useEffect(() => {
    setReRenderOnSettings(true);
  }, [settings]);

  return (
    <ContextData.Provider value={{ cartItems, setCartItems }}>
      <Router>
        <SystemMenu settings={settings} />
        <Routes>
          {/* POS System */}
          <Route path="/" element={<Home settings={settings} />} />
          <Route
            path="/on_going_order"
            element={<OnGoingOrder settings={settings} />}
          />
          <Route
            path="/todays_order"
            element={<TodaysOrder settings={settings} />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashBoard settings={settings} />}
          />

          {/* Food Management */}
          <Route
            path="/add_category"
            element={<AddCategory settings={settings} />}
          />
          <Route
            path="/category_list"
            element={<CategoryList settings={settings} />}
          />
          <Route path="/add_food" element={<AddFood settings={settings} />} />
          <Route path="/food_list" element={<FoodList settings={settings} />} />
          <Route
            path="/food_variant"
            element={<FoodVariant settings={settings} />}
          />
          <Route
            path="/food_availability"
            element={<FoodAvailability settings={settings} />}
          />
          <Route
            path="/food_menuType"
            element={<MenuType settings={settings} />}
          />
          <Route
            path="/add_addons"
            element={<AddAddons settings={settings} />}
          />
          <Route
            path="/addons_list"
            element={<AddonsList settings={settings} />}
          />
          <Route
            path="/addons_assign_list"
            element={<AddonsAssignList settings={settings} />}
          />

          {/* Accounts */}
          <Route
            path="/financial_year"
            element={<FinancialYear settings={settings} />}
          />
          <Route
            path="/financial_year_ending"
            element={<FinancialYearEnding settings={settings} />}
          />
          <Route
            path="/opening_balance"
            element={<OpeningBalance settings={settings} />}
          />
          <Route
            path="/chart_of_accounts"
            element={<ChartOfAccounts settings={settings} />}
          />
          <Route
            path="/supplier_payment"
            element={<Supplier settings={settings} />}
          />
          <Route
            path="/cash_adjustment"
            element={<Cash settings={settings} />}
          />
          <Route
            path="/debit_voucher"
            element={<DebitVoucher settings={settings} />}
          />
          <Route
            path="/credit_voucher"
            element={<CreditVoucher settings={settings} />}
          />
          <Route
            path="/contra_voucher"
            element={<ContraVoucher settings={settings} />}
          />
          <Route
            path="/journal_voucher"
            element={<Journal settings={settings} />}
          />
          <Route
            path="/voucher_approval"
            element={<VoucherApproval settings={settings} />}
          />

          {/* Accounts Reports */}
          <Route
            path="/voucher_report"
            element={<VoucherReport settings={settings} />}
          />
          <Route path="/cash_book" element={<CashBook settings={settings} />} />
          <Route path="/bank_book" element={<BankBook settings={settings} />} />

          {/* Human Resource */}
          <Route
            path="/designation"
            element={<Designation settings={settings} />}
          />
          <Route
            path="/add_employee"
            element={<AddEmployee settings={settings} />}
          />
          <Route
            path="/manage_employee"
            element={<ManageEmployee settings={settings} />}
          />
          <Route
            path="/manage_employee_salary"
            element={<ManageEmployeeSalary settings={settings} />}
          />

          {/* Application Settings */}
          <Route
            path="/application_setting"
            element={
              <ApplicationSettings
                settings={settings}
                setReRenderOnSettings={setReRenderOnSettings}
                reRenderOnSettings={reRenderOnSettings}
              />
            }
          />
          <Route path="/currency" element={<Currency settings={settings} />} />
          <Route path="/language" element={<Language settings={settings} />} />

          {/* Sales Report */}
          <Route
            path="/sales_report"
            element={
              <SalesReport languageData={languageData} settings={settings} />
            }
          />
          <Route
            path="/items_sales_report"
            element={<ItemSalesReport settings={settings} />}
          />
          <Route path="/contact" element={<Contact settings={settings} />} />
        </Routes>
      </Router>
    </ContextData.Provider>
  );
}
