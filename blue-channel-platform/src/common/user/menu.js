/**
 * 메인 메뉴 구조
 * @author kimhg
 * */

export const mainMenus = [
  {
    key: ['MENU_RECEIVE'],
    label: 'Account',
    className: 'bg5',
    link: '/receive/createAccount',
    nodes: [
      {
        key: ['MENU_RECEIVE_CREATE_ACCOUNT'],
        label: 'Open Account',
        link: '/receive/createAccount',
      },
      {
        key: ['MENU_RECEIVE_INPUT_CASH'],
        label: 'Deposit',
        link: '/receive/inputCash',
      },
      {
        key: ['MENU_RECEIVE_OUTPUT_CASH'],
        label: 'Withdrawal',
        link: '/receive/outputCash',
      },
      // {
      //   key: ['MENU_RECEIVE_OTHER_SEND'],
      //   label: '타발 송금 지급',
      //   link: '/receive/otherSend',
      // },
      {
        key: ['MENU_RECEIVE_SHOW_ACCOUNT'],
        label: 'Account Inquiry',
        link: '/receive/showAccount',
      },
      {
        key: ['MENU_RECEIVE_TRANSFER'],
        label: 'Bank Transfer',
        link: '/receive/transfer',
      },
    ]
  },
  {
    key: ['MENU_GIVE_FAITH'],
    label: 'Loan',
    link: '/give/pay',
    nodes: [
      {
        key: ['MENU_GIVE_PAY'],
        label: 'Bank Transfer',
        link: '/give/payPrincipleNInterestForLoan',
      },
      {
        key: ['MENU_GIVE_AGREE'],
        label: 'Loan Temporary Consent',
        link: '/give/loanTemporaryConsent',
      },
      {
        key: ['MENU_GIVE_RECEIVE'],
        label: 'Loan Receive',
        link: '/give/receiveLoan',
      },
    ]
  },
  {
    key: ['MENU_CARD'],
    label: 'Card',
    link: '/card/createCard',
    nodes: [
      {
        key: ['MENU_CARD_CREATE_CARD'],
        label: 'Card Application/New',
        link: '/card/createCard',
      },
      // {
      //   key: ['MENU_CARD_CHARGE'],
      //   label: '선불카드 충전',
      //   link: '/card/charge',
      // },
      {
        key: ['MENU_CARD_RECEIVE'],
        label: 'Card Receive',
        link: '/card/receiveCard',
      },
      {
        key: ['MENU_CARD_PAY'],
        label: 'Credit Card Payment',
        link: '/card/cardPay',
      },
    ]
  },
  {
    key: ['MENU_ETC'],
    label: 'Other',
    link: '/etc/utilityBill',
    nodes: [
      {
        key: ['MENU_ETC_PAY'],
        label: 'Utility Bill Payment',
        link: '/etc/utilityBill',
      },
      // {
      //   key: ['MENU_ETC_REPORT'],
      //   label: '제신고',
      //   link: '/etc/report',
      // },{
      //   key: ['MENU_ETC_AUTH'],
      //   label: '증명서',
      //   link: '/etc/auth',
      // },
    ]
  },
  {
    key: ['MENU_SETTING'],
    label: 'Setting',
    link: '/main',
  },
  // {
  //   key: ['MENU_'],
  //   label: '',
  //   link: '/',
  //   nodes: [
  //     {
  //       key: ['MENU_'],
  //       label: '',
  //       link: '/',
  //     },
  //   ]
  // },
];
