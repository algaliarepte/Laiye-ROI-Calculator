/** CALCULATIONS VARIABLES **/


const subTotals = {
    get savedHoursPerYear() {
        return $('#nbrProcesses').val() * $('#savedHoursPerProcess').val() * $('#proccessRuns').val() * 52;
    },
    get totalErrors() {
        return this.savedHoursPerYear / $('#errorFrequency').val();
    },
}

const savings = {
    get laborTime() {
        return subTotals.savedHoursPerYear * $('#hourlyCost').val();
    },
    get errors() {
        return subTotals.totalErrors * $('#costPerError').val();
    },

    get firstYear() {
        return this.laborTime + this.errors + gains.productivity + gains.serviceBusiness + gains.brand + gains.data;
    },
    get secondYear() {
        return this.firstYear - costs.annualMaintenanceSupport - costs.annualLicenseFee;
    },
    get thirdYear() {
        return this.firstYear - costs.annualMaintenanceSupport - costs.annualLicenseFee;
    },

    get firstYearCostIncluded() {
        return this.firstYear - costs.totalCosts;
    },

    get allYears() {
        return this.firstYearCostIncluded + this.secondYear + this.thirdYear;
    },
    get yearlyAverage() {
        return Math.round(this.allYears / 3);
    },
}

const gains = {
    get productivityRate() {
        return $('#increasedProductivity').val() / 100;
    },
    get productivity() {
        return savings.laborTime * this.productivityRate;
    },
    get serviceBusiness() {
        return parseFloat($('#appDataOptimisation').val()) + parseFloat($('#existingSystemExtension').val()) + parseFloat($('#automatedCommerce').val()) + parseFloat($('#growthStrategiesNewOpportunities').val()) + parseFloat($('#improvedMorale').val()) + parseFloat($('#reducedItDependence').val()) + parseFloat($('#increasedProfitMargin').val()) + parseFloat($('#otherSavings').val());
    },
    get brand() {
        return parseFloat($('#preventedCustomerLoss').val()) + parseFloat($('#reducedSalesLoss').val()) + parseFloat($('#improvedServices').val());
    },
    get data() {
        return parseFloat($('#simplifiedCompliance').val()) + parseFloat($('#documentRecords').val());
    }
}

const costs = {
    idp: 3000,
    rpaCreator: 15000,
    rpaWorker: 5000,
    rpaCommander: 5000,
    processDev: 20000,
    annualMaintenanceSupport: 10000,
    proServiceTraining: 11000,
    get totalCosts() {
        return this.idp + this.rpaCreator + this.rpaWorker + this.rpaCommander + this.processDev + this.annualMaintenanceSupport + this.proServiceTraining;
    },
    get annualLicenseFee() {
        return this.idp + this.rpaCreator + this.rpaWorker + this.rpaCommander;
    },
    get yearlyExpenses() {
        return this.annualLicenseFee + this.annualMaintenanceSupport
    }
}

let hypothesis = parseFloat($('#hypothesis').val())


/** DISPLAY RESULTS **/


function displayResults() {
    // Format numbers as currencies
    function formatNbr(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }
        return '$' + x1 + x2;
    }

    // Update form block totals and subtotals
    $('#savedHoursPerYear').text(formatNbr(subTotals.savedHoursPerYear)) || 0;
    $('#laborTime').text(formatNbr(savings.laborTime)) || 0;
    $('#totalErrors').text(formatNbr(subTotals.totalErrors)) || 0;
    $('#errors').text(formatNbr(savings.errors)) || 0;
    $('#productivity').text(formatNbr(gains.productivity)) || 0;
    $('#serviceBusiness').text(formatNbr(gains.serviceBusiness)) || 0;
    $('#brand').text(formatNbr(gains.brand)) || 0;
    $('#data').text(formatNbr(gains.data)) || 0;

    // Update total savings
    $('#laborTime-result').text(formatNbr(savings.laborTime)) || 0;
    $('#errors-result').text(formatNbr(savings.errors)) || 0;
    $('#productivity-result').text(formatNbr(gains.productivity)) || 0;
    $('#serviceBusiness-result').text(formatNbr(gains.serviceBusiness)) || 0;
    $('#brand-result').text(formatNbr(gains.brand)) || 0;
    $('#data-result').text(formatNbr(gains.data)) || 0;
    $('#firstYear').text(formatNbr(savings.firstYear)) || 0;

    // Update basic ROI
    $('#firstYear-cost').text(formatNbr(savings.firstYear - costs.totalCosts)) || 0;
    $('#secondYear').text(formatNbr(savings.secondYear)) || 0;
    $('#thirdYear').text(formatNbr(savings.thirdYear)) || 0;
    $('#allYears').text(formatNbr(savings.allYears)) || 0;
    $('#yearlyAverage').text(formatNbr(savings.yearlyAverage)) || 0;

    // Update estimated costs
    $('#idpCost').text(formatNbr(costs.idp)) || 0;
    $('#rpaCreatorCost').text(formatNbr(costs.rpaCreator)) || 0;
    $('#rpaWorkerCost').text(formatNbr(costs.rpaWorker)) || 0;
    $('#rpaCommanderCost').text(formatNbr(costs.rpaCommander)) || 0;
    $('#processDevCost').text(formatNbr(costs.processDev)) || 0;
    $('#annualMaintenanceSupportCost').text(formatNbr(costs.annualMaintenanceSupport)) || 0;
    $('#proServiceTrainningCost').text(formatNbr(costs.proServiceTraining)) || 0;
    $('#totalCost').text(formatNbr(costs.totalCosts)) || 0;
    $('#annualLicenceFee').text(formatNbr(costs.annualLicenseFee)) || 0;
    $('#hypothValue').text(hypothesis + '%') || 0;
};
displayResults();

$('.input-field').on('change', function () {
    displayResults();
});


/** SHOWN INPUT ERRORS **/


// Highlight errors on inputs change (when input value is empty)
$('.input-field').on('blur', function () {
    if (!$(this).val()) {
        $(this).css('border', '1px solid #ff4242');
    }
    else {
        $(this).css('border', 'none');
    }
});

/* Submission behavior */

$('#submit-button').on('click', function () {
    $('.input-field').each(function () {
        // Highlight errors on submit (when input value is empty)
        if (!$(this).val()) {
            $(this).css('border', '1px solid #ff4242');
        }
        else {
            roiChartData = chartsData.annualBenefit
        }
    });
});


/** ROI CALCULATOR CHARTS DATA **/


const npv = {
    get y1() {
        return (0 - costs.proServiceTraining) + (savings.secondYear / ((1 + hypothesis) ** 1));
    },
    get y2() {
        return this.y1 + (savings.secondYear / ((1 + hypothesis) ** 1));
    },
    get y3() {
        return this.y2 + (savings.secondYear / ((1 + hypothesis) ** 1));
    },
    get y4() {
        return this.y3 + (savings.secondYear / ((1 + hypothesis) ** 1));
    },
    get y5() {
        return this.y4 + (savings.secondYear / ((1 + hypothesis) ** 1));
    }
}

const roiPercentage = {
    get y1() {
        return savings.secondYear / costs.proServiceTraining
    },
    get y2() {
        return (savings.secondYear * 2) / costs.proServiceTraining
    },
    get y3() {
        return (savings.secondYear * 3) / costs.proServiceTraining
    },
    get y4() {
        return (savings.secondYear * 4) / costs.proServiceTraining
    },
    get y5() {
        return (savings.secondYear * 5) / costs.proServiceTraining
    }
}

const monthlyNpv = {
    get m1() {
        return (0 - costs.proServiceTraining) + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m2() {
        return this.m1 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m3() {
        return this.m2 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m4() {
        return this.m3 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m5() {
        return this.m4 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m6() {
        return this.m5 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m7() {
        return this.m6 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m8() {
        return this.m7 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m9() {
        return this.m8 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m10() {
        return this.m9 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m11() {
        return this.m10 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m12() {
        return this.m11 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m13() {
        return this.m12 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m14() {
        return this.m13 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m15() {
        return this.m14 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m16() {
        return this.m15 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m17() {
        return this.m16 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m18() {
        return this.m17 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m19() {
        return this.m18 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m20() {
        return this.m19 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m21() {
        return this.m20 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m22() {
        return this.m21 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m23() {
        return this.m22 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    },
    get m24() {
        return this.m23 + ((savings.secondYear / 12) / ((1 + hypothesis) ** 1));
    }
}

const chartsData = {

    get annualExpenses() {
        return [costs.proServiceTraining, costs.yearlyExpenses, costs.yearlyExpenses, costs.yearlyExpenses, costs.yearlyExpenses, costs.yearlyExpenses]
    },
    get netPresentValue() {
        return [npv.y1, npv.y2, npv.y3, npv.y4, npv.y5]
    },

    get netCashFlow() {
        return [(0 - costs.proServiceTraining), (savings.firstYear - costs.yearlyExpenses), (savings.firstYear - costs.yearlyExpenses), (savings.firstYear - costs.yearlyExpenses), (savings.firstYear - costs.yearlyExpenses), (savings.firstYear - costs.yearlyExpenses)]
    },

    get roi() {
        return [roiPercentage.y1, roiPercentage.y2, roiPercentage.y3, roiPercentage.y4, roiPercentage.y5]
    },
    get annualBenefit() {
        return [0 - costs.proServiceTraining, savings.firstYear, savings.firstYear, savings.firstYear, savings.firstYear, savings.firstYear]
    },
    get profitMargin() {
        return [monthlyNpv.m1, monthlyNpv.m2, monthlyNpv.m3, monthlyNpv.m4, monthlyNpv.m5, monthlyNpv.m6, monthlyNpv.m7, monthlyNpv.m8, monthlyNpv.m9, monthlyNpv.m10, monthlyNpv.m11, monthlyNpv.m12, monthlyNpv.m13, monthlyNpv.m14, monthlyNpv.m15, monthlyNpv.m16, monthlyNpv.m17, monthlyNpv.m18, monthlyNpv.m19, monthlyNpv.m20, monthlyNpv.m21, monthlyNpv.m22, monthlyNpv.m23, monthlyNpv.m24]
    }
}


/** ROI CALCULATOR CHARTS **/

$(document).ready(function () {
    const roiChart = new Chart(document.getElementById('roiChart'), {
        // Set chart type
        type: 'bar',

        // Chart config
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                },
                y: {
                    beginAtZero: true,
                    display: false,
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                }
            },
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            /*layout: {
                padding: 16,
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 4 | 3,*/
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            family: "'Biosans','Arial','sans-serif'",
                            size: 16,
                            lineHeight: 1.5
                        }
                    }
                },
                tooltip: {
                    titleColor: '#1f1f1f',
                    titleFont: {
                        family: "'Biosans','Arial','sans-serif'",
                        size: 16,
                        lineHeight: 1.5
                    },
                    titleMarginBottom: 4,
                    bodyColor: '#1f1f1f',
                    bodyFont: {
                        family: "'Biosans','Arial','sans-serif'",
                        size: 16,
                        lineHeight: 1.5
                    },
                    padding: 16,
                    cornerRadius: 0,
                    backgroundColor: '#fff',
                    boxPadding: 8,
                    borderColor: '#ddd',
                    borderWidth: '1'
                }
            }
        },

        // Chart data
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

            datasets: [{
                //label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    '#ffe600',
                ],
                borderColor: [
                    '#ffe600',
                ],
                borderWidth: 0
            }]
        }
    });

    let roiChartData = chartsData.annualBenefit //[12, 19, 3, 5, 2, 3]
    const annualBenefitChart = new Chart(document.getElementById('annualBenefitChart'), {
        // Set chart type
        type: 'bar',

        // Chart config
        options: {
            indexAxis: 'x',
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                },
                y: {
                    beginAtZero: true,
                    display: false,
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                }
            },
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            /*layout: {
                padding: 16,
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 4 | 3,*/
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            family: "'Biosans','Arial','sans-serif'",
                            size: 16,
                            lineHeight: 1.5
                        }
                    }
                },
                tooltip: {
                    titleColor: '#1f1f1f',
                    titleFont: {
                        family: "'Biosans','Arial','sans-serif'",
                        size: 16,
                        lineHeight: 1.5
                    },
                    titleMarginBottom: 4,
                    bodyColor: '#1f1f1f',
                    bodyFont: {
                        family: "'Biosans','Arial','sans-serif'",
                        size: 16,
                        lineHeight: 1.5
                    },
                    padding: 16,
                    cornerRadius: 0,
                    backgroundColor: '#fff',
                    boxPadding: 8,
                    borderColor: '#ddd',
                    borderWidth: '1'
                }
            }
        },

        // Chart data
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

            datasets: [{
                //label: '# of Votes',
                data: chartsData.annualBenefit, //[12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    '#ffe600',
                ],
                borderColor: [
                    '#ffe600',
                ],
                borderWidth: 0
            }]
        }
    });

    const profitMarginChart = new Chart(document.getElementById('profitMarginChart'), {
        // Set chart type
        type: 'line',

        // Chart config
        options: {
            indexAxis: 'x',
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                },
                y: {
                    beginAtZero: true,
                    display: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                }
            },
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            /*layout: {
                padding: 16,
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 4 | 3,*/
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            family: "'Biosans','Arial','sans-serif'",
                            size: 16,
                            lineHeight: 1.5
                        }
                    }
                },
                tooltip: {
                    titleColor: '#1f1f1f',
                    titleFont: {
                        family: "'Biosans','Arial','sans-serif'",
                        size: 16,
                        lineHeight: 1.5
                    },
                    titleMarginBottom: 4,
                    bodyColor: '#1f1f1f',
                    bodyFont: {
                        family: "'Biosans','Arial','sans-serif'",
                        size: 16,
                        lineHeight: 1.5
                    },
                    padding: 16,
                    cornerRadius: 0,
                    backgroundColor: '#fff',
                    boxPadding: 8,
                    borderColor: '#ddd',
                    borderWidth: '1'
                }
            }
        },

        // Chart data
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

            datasets: [{
                //label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    '#ffe60029',
                ],
                borderColor: [
                    '#ffe600',
                ],
                borderWidth: 4,
                fill: false,
                tension: 0
            }]
        }
    });
});