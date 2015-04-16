---
title: Things I Use - Personal Finance
date: '2015-04-16T01:48:49+00:00'
tags:
  - tools
  - finance
  - accounting
  - personal finance
  - personal capital
  - mint
  - ledger
  - bookkeeping
  - double-entry bookkeeping
layout: post
summary: Personal finance tools, such as Personal Capital, Mint, and Ledger, can provide useful insight and visualizations into how your money is being spent, how your portfolio is performing, and how well you're budgeting.
---

I've often toyed with writing a post about things I use on a daily basis (see my [Personal Security Tools](/personal-security-tools/) post which, admittedly, contains a few things I don't use on a daily basis), but never quite convinced myself that the lists would be substantial or unique enough to write about.

I figure that it gets exhausting to read about really geeky things like command line tools and server technology all the time, so I hope that these posts might be a little more useful if they speak to a slightly more conventional audience.

So, here it is -- and on Tax Day no less! With one exception, these are all tools that anyone with a computer can readily use.

<!-- e -->
<span id="more"></span>
<hr>

### Personal Capital

[Personal Capital](https://www.personalcapital.com){: target="_blank" } stole my heart from Mint nearly two years ago, and I've hardly looked back. Why? I make a good effort to save for the future by contributing to retirement funds. Personal Capital does a fantastic job at conveying what is happening in my retirement accounts.

Typical retirement funds are really just stocks and bonds under the hood. Knowing how they perform can provide insight into how well your retirement plan choices are working out. Personal Capital links up with your brokerage to provide pretty (and useful!) charts about your holdings, personal performance, allocation, and the overall health of your funds.

![Personal Capital investment charts](/assets/img/2015-04-15-things-i-use-personal-finance/personal-capital-investment.png)

But, even more mundane things like your weekly, monthly, and yearly cash flow are neatly organized and presented.

![Personal Capital cash flow charts](/assets/img/2015-04-15-things-i-use-personal-finance/personal-capital-cash-flow.png)

Finally, the Personal Capital iOS app very neatly translates this experience to your phone. I don't use many of my phone apps on a daily basis, but I do open Personal Capital at least once a day to check in on things. If even just to zone out at the colorful graphs.

### Mint

I hesitate to mention [Mint](https://www.mint.com){: target="_blank" }. I do check in with Mint at least once a week and find it handy for a small set of cases. Why don't I use it more?

Despite the myriad ways a service like Mint *could* empower and enlighten its users, each page is instead inundated with poorly-targeted offers that have been squeezed into every little place one can imagine.

And while Mint and Personal Capital both employ similar visual elements (donut charts, bar graphs, and data tables), Mint makes some unfortunate assumptions about how this data can and should be presented. Mint bails out of letting you drill down in its donut charts at a certain point, dropping you into a table of transactions (why?!). Personal Capital will happily plot and present category and merchant break-downs indefinitely.

Mint's iOS app is insufferable. It is woefully under-responsive to touch input and refreshes under your fingers in such a way to totally cripple your interaction with the app. Despite regular updates it really hasn't gotten better at all. While the reviews on the App Store indicate a lot of people are happy with it, I'm not one of them.

On the positive side, Mint does a great job with its budgeting and goals features, and is slightly smarter about categorizing transactions than Personal Capital. I keep it around mostly because I have a lot of data in there.

### Ledger

I love the command line. I also really like [double-entry bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping_system){: target="_blank"}. Yeah, I'm weird.

[Ledger](http://www.ledger-cli.org){: target="_blank" } is a command line program that puts one hell of an engine behind what would otherwise be plain-text transaction entries. Here's a quick example of what I mean:

~~~ text
$ tail -15 current.ledger
2015/04/06  ! Olive Bistro
  Expenses:Food:Dining                          $     8.63
  Expenses:Food:Dining:Tip                      $     2.00
  Liabilities:Credit Cards

2015/04/06  ! Home Depot
  Expenses:Home Improvement                     $     8.96
  Expenses:Taxes:State:Sales Tax                $     0.72
  Liabilities:Credit Cards

2015/04/07  ! Whole Foods
  Expenses:Food:Dining                          $     9.98
  Expenses:Taxes:State:Sales Tax                $     0.80
  Liabilities:Credit Cards

$ ledger reg dining --period 'this month'
15-Apr-06 Olive Bistro          Expenses:Food:Dining         $ 8.63       $ 8.63
                                Expens:Food:Dining:Tip       $ 2.00      $ 10.63
15-Apr-07 Whole Foods           Expenses:Food:Dining         $ 9.98      $ 20.61
~~~

And that's just one small example. Ledger supports forecasting, budgeting, commodities (so you can track your assets in USD, GBP, the current market rate for unicorn blood, whatever), and so much more.

Since Ledger's entire purpose is to analyze transactions, it never modifies your actual ledger files. They're always beautiful, plain-text, highly flexible files that you have full control over. I even store them in a Git repository and have a small script to update the closing price of a few stocks I own. Awesome.

Ledger definitely falls into the hands-on end of the spectrum. Give it a pass if you don't have the time, patience, or desire to neatly organize and categorize every transaction you make. It's definitely not for everybody.

<hr>

{: .text-center .license-statement .smaller-caps }
Personal Capital © Personal Capital Corporation. Mint © 2015 Intuit, Inc. All rights reserved.

