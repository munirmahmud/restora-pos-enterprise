import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faBriefcase,
  faChartLine,
  faCog,
  faCube,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PremiumVersion from '../PremiumVersion';
import './Sidebar.style.scss';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['food_management'];

export const Sidebar = ({ settings }) => {
  const [openKeys, setOpenKeys] = useState(['food_management']);
  const [premiumVersion, setPremiumVersion] = useState(false);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = (e) => {};

  return (
    <>
      <div className="sidebar" style={{ background: '#001529' }}>
        {settings?.logo && (
          <div className="sidebar_logo">
            <Image src={`file://${settings?.logo}`} preview={false} />
          </div>
        )}

        <Menu
          theme="dark"
          style={{
            height: '100%',
          }}
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          <Menu.Item key="dash_board" icon={<FontAwesomeIcon icon={faHome} />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <SubMenu
            key="food_management"
            title="Food Management"
            icon={<FontAwesomeIcon icon={faCube} />}
          >
            <SubMenu key="manage_category" title="Manage Category">
              <Menu.Item key="manage_category:1">
                <Link to="/add_category">Add Category</Link>
              </Menu.Item>

              <Menu.Item key="manage_category:2">
                <Link to="/category_list">Category List</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="manage_food" title="Manage Food">
              <Menu.Item key="manage_food:1">
                <Link to="/add_food">Add Food</Link>
              </Menu.Item>

              <Menu.Item key="manage_food:2">
                <Link to="/food_list">Food List</Link>
              </Menu.Item>

              {/* <Menu.Item key="manage_food:3">Add Group Item</Menu.Item> */}

              <Menu.Item key="manage_food:4">
                <Link to="/food_variant">Food Variant</Link>
              </Menu.Item>

              <Menu.Item key="manage_food:5">
                <Link to="/food_availability">Food Availability</Link>
              </Menu.Item>

              <Menu.Item key="manage_food:6">
                <Link to="/food_menuType">Menu Type</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="manage_addons" title="Manage Add-ons">
              <Menu.Item key="manage_addons:1">
                <Link to="/add_addons">Add Add-ons</Link>
              </Menu.Item>

              <Menu.Item key="manage_addons:2">
                <Link to="/addons_list">Add-ons Lists</Link>
              </Menu.Item>

              <Menu.Item key="manage_addons:3">
                <Link to="/addons_assign_list">Add-ons Assign List</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu
            key="accounts"
            title="Accounts"
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <Menu.Item key="financial_year:1">
              <Link to="/financial_year">Financial Year</Link>
            </Menu.Item>

            <Menu.Item key="financial_year_ending:2">
              <Link to="/financial_year_ending">Financial Year Ending</Link>
            </Menu.Item>

            <Menu.Item key="opening_balance:3">
              <Link to="/opening_balance">Opening Balance</Link>
            </Menu.Item>

            <Menu.Item key="chart_of_accounts:4">
              <Link to="/chart_of_accounts">Chart of Accounts</Link>
            </Menu.Item>

            <Menu.Item key="supplier_payment:5">
              <Link to="/supplier_payment">Supplier payment</Link>
            </Menu.Item>

            <Menu.Item key="cash_adjustment:6">
              <Link to="/cash_adjustment">Cash Adjustment</Link>
            </Menu.Item>

            <Menu.Item key="debit_voucher:7">
              <Link to="/debit_voucher">Debit Voucher</Link>
            </Menu.Item>

            <Menu.Item key="credit_voucher:8">
              <Link to="/credit_voucher">Credit Voucher</Link>
            </Menu.Item>

            <Menu.Item key="contra_voucher:9">
              <Link to="/contra_voucher">Contra Voucher</Link>
            </Menu.Item>

            <Menu.Item key="journal_voucher:10">
              <Link to="/journal_voucher">Journal Voucher</Link>
            </Menu.Item>

            <Menu.Item key="voucher_approval:10">
              <Link to="/voucher_approval">Voucher Approval</Link>
            </Menu.Item>

            <SubMenu key="accounts_reports" title="Accounts Report">
              <Menu.Item key="voucher_report:1">
                <Link to="/voucher_report">Voucher Report</Link>
              </Menu.Item>

              <Menu.Item key="cash_book:2">
                <Link to="/cash_book">Cash Book</Link>
              </Menu.Item>

              <Menu.Item key="bank_book:3">
                <Link to="/bank_book">Bank Book</Link>
              </Menu.Item>

              <Menu.Item key="general_ledger:4">
                <Link to="/general_ledger">General Ledger</Link>
              </Menu.Item>

              <Menu.Item key="trial_balance:5">
                <Link to="/trial_balance">Trial Balance</Link>
              </Menu.Item>

              <Menu.Item key="profit_loss:6">
                <Link to="/profit_loss">Profit Loss</Link>
              </Menu.Item>

              <Menu.Item key="cash_flow:7">
                <Link to="/cash_flow">Cash Flow</Link>
              </Menu.Item>

              <Menu.Item key="coa_print:8">
                <Link to="/coa_print">COA Print</Link>
              </Menu.Item>

              <Menu.Item key="balance_sheet:9">
                <Link to="/balance_sheet">Balance Sheet</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu
            key="human_resource"
            title="Human Resource"
            icon={<FontAwesomeIcon icon={faUser} />}
          >
            <SubMenu key="employee" title="Employee">
              <Menu.Item key="designation:1">
                <Link to="/designation">Designation</Link>
              </Menu.Item>

              <Menu.Item key="add_employee:2">
                <Link to="/add_employee">Add Employee</Link>
              </Menu.Item>

              <Menu.Item key="manage_employee:3">
                <Link to="/manage_employee">Manage Employee</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="departments">
              <Link to="/departments">Departments</Link>
            </Menu.Item>

            <SubMenu key="attendance" title="Attendance">
              <Menu.Item key="attendance_form:1">
                <Link to="/attendance_form">Attendance Form</Link>
              </Menu.Item>

              {/* <Menu.Item key="attendance_report:2">
                <Link to="/attendance_report">Attendance Report</Link>
              </Menu.Item> */}
            </SubMenu>

            <SubMenu key="leave" title="Leave">
              <Menu.Item key="leave_application:1">
                <Link to="/leave_application">Leave Application</Link>
              </Menu.Item>
              <Menu.Item key="leave_balance:2">
                <Link to="/leave_balance">Leave Balance</Link>
              </Menu.Item>
              <Menu.Item key="holiday:3">
                <Link to="/holiday">Holiday</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="pay_roll" title="Pay Roll">
              <Menu.Item key="advance_salary:1">
                <Link to="/advance_salary">Advance Salary</Link>
              </Menu.Item>
              <Menu.Item key="monthly_deduction:2">
                <Link to="/monthly_deduction">Monthly Deduction</Link>
              </Menu.Item>
              <Menu.Item key="salary_generate:3">
                <Link to="/salary_generate">Salary Generate</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="loan" title="Loan">
              <Menu.Item key="grant_loan:1">
                <Link to="/grant_loan">Grant Loan</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="kitchen" title="Kitchen">
              <Menu.Item key="add_kitchen:1">
                <Link to="/add_kitchen">Add Kitchen</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu
            key="application_setting"
            title="Setting"
            icon={<FontAwesomeIcon icon={faCog} />}
          >
            <Menu.Item key="application_setting:1">
              <Link to="/application_setting">Application Setting</Link>
            </Menu.Item>

            <Menu.Item key="currency:2">
              <Link to="/currency">Currency</Link>
            </Menu.Item>

            <Menu.Item key="language:2">
              {settings.appStatus === 'free' ? (
                <Link to="#" onClick={() => setPremiumVersion(true)}>
                  Language
                </Link>
              ) : (
                <Link to="/language">Language</Link>
              )}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="report"
            title="Report"
            icon={<FontAwesomeIcon icon={faChartLine} />}
          >
            <Menu.Item key="salesReport">
              <Link to="/sales_report">Sales Report</Link>
            </Menu.Item>

            <Menu.Item key="itemsSalesReport">
              <Link to="/items_sales_report">Items Sales Report</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>

      <PremiumVersion
        premiumVersion={premiumVersion}
        setPremiumVersion={setPremiumVersion}
      />
    </>
  );
};

export default Sidebar;
