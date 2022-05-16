import { Image } from 'antd';
import moment from 'moment';
import restoraPosLogo from '../../../../assets/retora_pos.png';

const headingStyles = {
  fontWeight: 700,
  marginBottom: 0,
  color: '#000',
  fontSize: '12px',
};
const paragraphStyles = {
  textAlign: 'center',
  marginBottom: 0,
  color: '#000',
  fontSize: 12,
};
const spanStyles = {
  fontWeight: 'normal',
  color: '#000',
  fontSize: 12,
  marginBottom: 0,
};

const DueInvoiceModal = ({ orderData, printDueInvoice, settings }: any) => {
  const date = new Date();

  return (
    <div id={`${printDueInvoice}`} style={{ display: 'none' }}>
      <div className="inVoice_print_area">
        <div
          className="in_voice_logo"
          style={{ textAlign: 'center', padding: '5px 0px' }}
        >
          <Image
            src={`${
              settings?.logo ? `file://${settings?.logo}` : restoraPosLogo
            }`}
            width={150}
            preview={false}
          />
        </div>

        <h2 style={{ ...headingStyles, textAlign: 'center', fontSize: 40 }}>
          {settings.storename ? settings.storename : 'Restora POS'}
        </h2>
        <p style={paragraphStyles}>{settings?.address}</p>

        <div className="in_voice_info " style={{ marginTop: '0.2rem' }}>
          {/* {foodData?.order_id && (
            <h4 style={headingStyles}>
              Receipt No:{' '}
              <span style={spanStyles}>
                {checkTokenLength(receiptNo, foodData?.order_id)}
              </span>
            </h4>
          )} */}
          <h4 style={headingStyles}>
            Date:{' '}
            <span style={spanStyles}>{`${moment(date).format('LLL')}`}</span>
          </h4>

          {/* Static payment method type */}
          <h4 style={headingStyles}>
            Payment Method: <span style={spanStyles}>Cash</span>
          </h4>

          {settings?.vattinno && (
            <h4 style={headingStyles}>
              Tin Or Vat No:{' '}
              <span style={spanStyles}>{settings?.vattinno}</span>
            </h4>
          )}
        </div>

        <div style={{ border: '1px dashed #000' }}></div>

        <div>
          <div className="in_voice_info flex content_between">
            <h4 style={headingStyles}>Item</h4>
            <h4 style={headingStyles}>Total</h4>
          </div>

          {/* {foodItems?.length > 0 &&
            foodItems?.map((item, index) => (
              <div key={index} className="in_voice_info flex content_between">
                <p style={spanStyles}>
                  {item.product_name} {item.quantity} x {item.price}
                </p>
                <p style={headingStyles}>{item.total_price}</p>
              </div>
            ))} */}
        </div>

        <div style={{ border: '1px dashed #000' }}></div>

        <div>
          <div className="in_voice_info flex content_between">
            <h4 style={headingStyles}>Subtotal</h4>
            <h4 style={headingStyles}>
              {/* {settings.currency_icon} {grandTotal} */}
              {settings.currency_icon}
            </h4>
          </div>

          <div className="in_voice_info flex content_between">
            <p style={{ ...spanStyles, marginBottom: 0 }}>
              Vat({settings.vat ? settings.vat : 0}%)
            </p>
            <p style={headingStyles}>
              {/* {settings.currency_icon} {calc.getVat()} */}
              {settings.currency_icon}
            </p>
          </div>

          <div className="in_voice_info flex content_between">
            <p style={spanStyles}>Service Charge</p>
            <p style={headingStyles}>
              {/* {settings.currency_icon} {serviceCharge} */}
              {settings.currency_icon}
            </p>
          </div>

          <div className="in_voice_info flex content_between">
            <p style={spanStyles}>Discount</p>
            <p style={headingStyles}>
              {/* {settings.currency_icon} {customDiscountAmount} */}
              {settings.currency_icon}
            </p>
          </div>
        </div>

        <div style={{ border: '1px dashed #000' }}></div>

        <div>
          <div className="in_voice_info flex content_between">
            <h4 style={headingStyles}>Total</h4>
            <h4 style={headingStyles}>
              {/* {settings.currency_icon} {grandTotal} */}
              {settings.currency_icon}
            </h4>
          </div>
        </div>

        <div className="in_voice_info flex content_center">
          {/* <p style={headingStyles}>Billing To: {customerName}</p> */}
          <p style={headingStyles}>Billing To: customerName</p>
        </div>

        <h3 style={{ ...paragraphStyles, fontWeight: 700, fontSize: '14px' }}>
          Thank you very mush
        </h3>
        <div style={{ border: '1px solid #000' }}></div>
        <p style={paragraphStyles}>Powered By: Restora POS,</p>
        <p style={paragraphStyles}>https://restorapos.com/</p>
      </div>
    </div>
  );
};

export default DueInvoiceModal;
