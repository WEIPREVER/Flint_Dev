import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const BudgetTabs = () => {
 let budgetState = useSelector((state)=> {
     return state["budget"];
 })
    let startingBudget = budgetState.startingBudget;
    let remainingBudget = budgetState.remainingBudget;
    let distributedBudget = budgetState.distributedBudget;

    return (
        <div>
            <div className={'col-sm'}>
                <div className={'alert alert-secondary'}>
                    <span style={{fontWeight:'bold'}}>Starting Budget: ${startingBudget} </span>
                </div>            </div>
            <div className={'col-sm'}>
                <div className={'alert alert-success'}>
                    <span style={{fontWeight: 'bold'}}>Remaining Budget: ${remainingBudget}</span>
                </div>
            </div>
            <div className={'col-sm'}>
                <div className={'alert alert-primary'}>
                    <span style={{fontWeight:'bold'}}> Distributed Budget: ${distributedBudget} </span>
                </div>
            </div>
        </div>
    )
}
export default BudgetTabs;