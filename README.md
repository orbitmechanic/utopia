# utopia
An ecosystem of trading bot strategies.

Databasing:
-Utopia will implement a database of:
- users:
    .name
    .type 'divine'|'guru'|'seeker'
    .feeRate
    .{exchange, username, password, APIkey}
    .{data service, username, password, APIkey}

Users will sign in and store their account information.  There are 3 types of users available: 'divine', 'guru', and 'seeker'.  'divine' are developer(s).  All positions pay the divine their rate.  'guru' are strategy curators who charge seekers for use of their curated strategies.  'seeker's are clients.  

Fees are paid on a per-closed-position basis.  Negative fees may be charged to curators to incentivize them and to provide some guarantee to seekers for guru services.  The divine only collect fees.

All API keys and exchange access data are stored under each user's account.  Obviously finance-level security will be required.

- exchanges:
    .name
    .website
    .@ExchangeAPI
    .fees { type, value}

- dataServices:
    .name
    .website
    .@DataServiceAPI
    .fees { type, value}

Exchange and data service records are for storing an API object and associated fee structure for use in strategy calculations.

- asset:
    .name
    .pairs{asset,exchange,dataService}
- currency:
    .name

The asset list is for storing the names of assets, which exchanges they can be traded, and what data services report on them.  Currency records are for localizing cost basis in strategy calculations.


- priceHistory:
    .asset
    .currency
    .source
    .scale ('year','month','day','hour','minute','sec')
    .step (1,5,10)
    .startTime
    .stopTime
    .values[]

Price history records are to avoid re-requesting the same historical data twice from data source API's.  Its stored as arrays on a per-call basis.

- position
    .user
    .exchange
    .asset
    .currency
    .filledPrice[]
    .filledTime[]
    .closedPrice[]
    .closedTime[]
    .size[]
    .strategy

Position records are for managing and recording positions throughout Utopia.

- strategy
    .name
    .comments
    .userOwner
    .feeRate
    .trainedOn[{asset,currency,exchange,scale,periods,starttime,return}]
    .signal
        .open[]
        .close[]
        .stopLoss[]
        .takeProfit[]

A strategy is a container of agreggations of signal functions and their training records. 'Return' is a percentage of the maximum availalbe gains.

- signal
    .name
    .comments
    .userOwner
    .feeRate
    .name
    .@indicators[]

A signal is an agregation of indicator functions/closures.

- indicator
    .@code
    .userOwner
    .feeRate

An indicator is a container for JS code to process history data into bear and bull signal arrays.

- response
    .acting (name)
    .vs {asset,currency,exchange,scale,periods,starttime}
    .bear[]
    .bull[]

A response is the response of an indicator or a signal to the .vs slice of training data.  The .bear and .bull fields are boolean arrays corresponding to the training array.

Evolving
-Users create or select a population of strategies from indicators aggregated as signals.
-Users select trading pair and history slice to train against.
-The maximum available gains are calculated from the training data.
-Responses are generated for all indicators vs. the training data set.
-Responses are aggregated for signals from indicator responses.
-Responses are aggregated for strategies from signal responses.
-Positions across the training data are mocked for strategies based on their component signals.  These mock positions will be recorded with a 'mock' for their exchange name.
-Gains are calculated for each position.
-Percentage of all possible gains will be used as a cost function.
-The genetic algorithm will be applied to resurrect the top 25%, cross-breed the middle 50%, and mutate the lower 25% of the population of signals and strategies.
-Process repeats until population results optimize vs. available gains.

Deployment:
-A user interface will allow users to select and deploy available strategies to their available accounts.  A production server will then execute strategies until halted by user command.
-Fees will be calculated and paid by send commands issued among user on-chain addresses.