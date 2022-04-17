// import InVoiceLogo from '../../../../assets/retora_pos.png';
import { Image } from 'antd';
import { CalculatePrice, checkTokenLength } from 'helpers';
import moment from 'moment';
import { useRef } from 'react';
import restoraPosLogo from '../../../../assets/retora_pos.png';
import './InVoiceGenerate.style.scss';

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

const InVoiceGenerate = ({
  settings,
  foodItems,
  foodData,
  invoicePrintDivId,
  customerName,
  grandTotal,
  customDiscountAmount,
  serviceCharge,
}) => {
  const date = new Date();
  const invoiceWrapperRef = useRef(null);
  const calc = new CalculatePrice(settings, foodItems);
  const receiptNo = foodData?.order_id?.toString().length;

  return (
    <div
      className="inVoice_wrapper"
      id={`${invoicePrintDivId}`}
      style={{
        padding: '0px 20px',
        margin: 0,
        display: 'none',
      }}
    >
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
          {foodData?.order_id && (
            <h4 style={headingStyles}>
              Receipt No:{' '}
              <span style={spanStyles}>
                {checkTokenLength(receiptNo, foodData?.order_id)}
              </span>
            </h4>
          )}
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

          {foodItems?.length > 0 &&
            foodItems?.map((item, index) => (
              <div key={index} className="in_voice_info flex content_between">
                <p style={spanStyles}>
                  {item.product_name} {item.quantity} x {item.price}
                </p>
                <p style={headingStyles}>{item.total_price}</p>
              </div>
            ))}
        </div>

        <div style={{ border: '1px dashed #000' }}></div>

        <div>
          <div className="in_voice_info flex content_between">
            <h4 style={headingStyles}>Subtotal</h4>
            <h4 style={headingStyles}>
              {settings.currency_icon} {grandTotal}
            </h4>
          </div>

          <div className="in_voice_info flex content_between">
            <p style={{ ...spanStyles, marginBottom: 0 }}>
              Vat({settings.vat ? settings.vat : 0}%)
            </p>
            <p style={headingStyles}>
              {settings.currency_icon} {calc.getVat()}
            </p>
          </div>

          <div className="in_voice_info flex content_between">
            <p style={spanStyles}>Service Charge</p>
            <p style={headingStyles}>
              {settings.currency_icon} {serviceCharge}
            </p>
          </div>

          <div className="in_voice_info flex content_between">
            <p style={spanStyles}>Discount</p>
            <p style={headingStyles}>
              {settings.currency_icon} {customDiscountAmount}
            </p>
          </div>
        </div>

        <div style={{ border: '1px dashed #000' }}></div>

        <div>
          <div className="in_voice_info flex content_between">
            <h4 style={headingStyles}>Total</h4>
            <h4 style={headingStyles}>
              {settings.currency_icon} {grandTotal}
            </h4>
          </div>
        </div>

        <div className="in_voice_info flex content_center">
          <p style={headingStyles}>Billing To: {customerName}</p>
        </div>

        <h3 style={{ ...paragraphStyles, fontWeight: '700', fontSize: '14px' }}>
          Thank you very mush
        </h3>
        <div style={{ border: '1px solid #000' }}></div>
        <p style={paragraphStyles}>Powered By: Restora POS,</p>
        <p style={paragraphStyles}>https://restorapos.com/</p>
      </div>
    </div>
  );
};

export default InVoiceGenerate;
