import { Fragment } from "react";
import { Outlet,Link } from "react-router-dom"
import './navigation.styles.scss'

const Navigation = () =>
{
  return(
  <Fragment>
    <div className="navigation">
        <div className="nav-links-container">
            <Link className="nav-link" to='/nav/home'>
            Home
            </Link>
            <Link className="nav-link" to='/nav/expense'>
            Expense
            </Link>
            <Link className="nav-link" to='/nav/expense_type'>
            Expense Type
            </Link>
            <Link className="nav-link" to='/nav/expected_expense'>
            Expected Expense
            </Link>
            <Link className="nav-link" to='/nav/income'>
            Income
            </Link>
            </div>
    </div>
    <Outlet/>
    </Fragment>
  )
}

export {Navigation};