import React from 'react';

const BudgetTabs = () => {

    return (
        <div>
            <div className={'col-sm'}>
                <div className={'alert alert-secondary'}>
                    <span style={{fontWeight:'bold'}}>Starting Budget: ${0.00} </span>
                </div>            </div>
            <div className={'col-sm'}>
                <div className={'alert alert-success'}>
                    <span style={{fontWeight: 'bold'}}>Remaining Budget: ${0.00}</span>
                </div>
            </div>
            <div className={'col-sm'}>
                <div className={'alert alert-primary'}>
                    <span style={{fontWeight:'bold'}}> Distributed Budget: ${0.00} </span>
                </div>
            </div>
        </div>
    )
}
export default BudgetTabs;