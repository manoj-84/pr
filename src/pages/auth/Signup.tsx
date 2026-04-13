import { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    businessAddress: "",
    country: "",
    timeZone: "",
    primaryFullName: "",
    primaryJobTitle: "",
    primaryEmail: "",
    primaryPhone: "",
    techFullName: "",
    techJobTitle: "",
    techEmail: "",
    techPhone: "",
    plantName: "",
    plantLocation: "",
    installedCapacity: "",
    acCapacity: "",
    dcCapacity: "",
    numInverters: "",
    inverterModel: "",
    numStrings: "",
    numFeeders: "",
    monitoringStartDate: "",
    gridVoltage: "",
    commissioningDate: "",
    scadaVendor: "",
    scadaModel: "",
    protocol: "",
    pollingInterval: "",
    pushMethod: "",
    ntpConfigured: "",
    inverterMapping: "",
    meterDetails: "",
    weatherStation: "",
    sensorList: "",
    alarmCodes: "",
    sldAvailable: "",
    networkDiagram: "",
    backfillRequired: "",
    backfillStartDate: "",
    apiIntegration: "",
    apiEndpoint: "",
    vpnRequired: "",
    staticIp: "",
    numUsers: "",
    roles: "",
    usernameFormat: "",
    ipWhitelisting: "",
    ssoRequired: "",
    billingName: "",
    billingEmail: "",
    purchaseOrder: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

 const handleSubmit = async () => {
  try {
    const payload = {
      username: formData.adminUsername,
      password: formData.adminPassword,
    };

    const res = await axios.post("http://localhost:5000/signup", payload);

    if (res.status === 200) {
      alert("Admin account created successfully!");
    } else {
      alert("Error creating account: " + res.data);
    }
  } catch (err) {
    console.error(err);
    alert("Server error while creating account");
  }
};

    // Helper validation for numeric-only fields
  const handleNumericChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      handleChange(e);
    }
  };

  // Helper validation for character-only fields
  const handleCharChange = (e) => {
    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
      handleChange(e);
    }
  };
  return (
    <div className="signup-container">
      {step === 1 && (
        <>
          <h3>Client Company Information</h3>
          <form className="signup-form">
            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName || ""}
              onChange={handleCharChange}
              required
            />
            <input
              name="registrationNumber"
              placeholder="Company Registration Number"
              value={formData.registrationNumber || ""}
              onChange={handleChange}
              required
            />
            <input
              name="businessAddress"
              placeholder="Business Address"
              value={formData.businessAddress || ""}
              onChange={handleChange}
              required
            />
            <input
              name="country"
              placeholder="Country/Region"
              value={formData.country || ""}
              onChange={handleCharChange}
              required
            />
            <input
              name="timeZone"
              placeholder="Time Zone"
              value={formData.timeZone || ""}
              onChange={handleChange}
              required
            />
            <div className="button-row">
              <button type="button" onClick={() => {
    if (!formData.companyName || !formData.registrationNumber || !formData.businessAddress || !formData.country || !formData.timeZone) {
      alert("Please fill all required fields");
      return;
    }
    nextStep();
  }}
>Next</button>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Primary Contact (Account Owner)</h3>
          <form className="signup-form">
            <input
              name="primaryFullName"
              placeholder="Full Name"
              value={formData.primaryFullName || ""}
              onChange={handleCharChange}
              required
            />
            <input
              name="primaryJobTitle"
              placeholder="Job Title"
              value={formData.primaryJobTitle || ""}
              onChange={handleCharChange}
              required
            />
            <input
              name="primaryEmail"
              placeholder="Official Email Address"
              value={formData.primaryEmail || ""}
              onChange={handleChange}
              required
            />
            <input
              name="primaryPhone"
              placeholder="Phone Number"
              value={formData.primaryPhone || ""}
              onChange={handleNumericChange}
              required
            />
            <div className="button-row">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={() => {
            if (
              !formData.primaryFullName ||
              !formData.primaryJobTitle ||
              !formData.primaryEmail ||
              !formData.primaryPhone
            ) {
              alert("Please fill all required fields");
              return;
            }
            nextStep();
          }}
        >Next</button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Technical/Operations Contact (Optional)</h3>
          <form className="signup-form">
            <input
              name="techFullName"
              placeholder="Full Name"
              value={formData.techFullName || ""}
              onChange={handleCharChange}
            />
            <input
              name="techJobTitle"
              placeholder="Job Title"
              value={formData.techJobTitle || ""}
              onChange={handleCharChange}
            />
            <input
              name="techEmail"
              placeholder="Email Address"
              value={formData.techEmail || ""}
              onChange={handleChange}
            />
            <input
              name="techPhone"
              placeholder="Phone Number"
              value={formData.techPhone || ""}
              onChange={handleNumericChange}
            />
            <div className="button-row">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          </form>
        </>
      )}

      {step === 4 && (
        <>
          <h3>Plant Details</h3>
          <form className="signup-form">
            <input name="plantName" placeholder="Plant Name" value={formData.plantName || ""} onChange={handleCharChange} required />
            <input name="plantLocation" placeholder="Plant Location" value={formData.plantLocation || ""} onChange={handleCharChange} required />
            <input name="installedCapacity" placeholder="Installed Capacity (kW)" value={formData.installedCapacity || ""} onChange={handleNumericChange} required />
            <input name="acCapacity" placeholder="AC Capacity (kW)" value={formData.acCapacity || ""} onChange={handleNumericChange} required />
            <input name="dcCapacity" placeholder="DC Capacity (kW)" value={formData.dcCapacity || ""} onChange={handleNumericChange} required />
            <input name="numInverters" placeholder="Number of Inverters" value={formData.numInverters || ""} onChange={handleNumericChange} required />
            <input name="inverterModel" placeholder="Inverter Brand/Model" value={formData.inverterModel || ""} onChange={handleCharChange} required />
            <input name="numStrings" placeholder="Number of Strings" value={formData.numStrings || ""} onChange={handleNumericChange} required />
            <input name="numFeeders" placeholder="Number of Feeders/Transformers" value={formData.numFeeders || ""} onChange={handleNumericChange} required />
            <label htmlFor="monitoringStartDate">Monitoring Start Date:</label>
            <input type="date" name="monitoringStartDate" placeholder="Monitoring Start Date" value={formData.monitoringStartDate || ""} onChange={handleChange} required />
            <input name="gridVoltage" placeholder="Grid Connection Voltage Level" value={formData.gridVoltage || ""} onChange={handleNumericChange} required />
            <label htmlFor="monitoringStartDate">Commissioning Date:</label><input type="date" name="commissioningDate" placeholder="Commissioning Date" value={formData.commissioningDate || ""} onChange={handleChange} required />
            <div className="button-row">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={() => {
            if (
              !formData.plantName ||
              !formData.plantLocation ||
              !formData.installedCapacity ||
              !formData.acCapacity ||
              !formData.dcCapacity ||
              !formData.numInverters ||
              !formData.inverterModel ||
              !formData.numStrings ||
              !formData.numFeeders ||
              !formData.monitoringStartDate ||
              !formData.gridVoltage ||
              !formData.commissioningDate
            ) {
              alert("Please fill all required fields");
              return;
            }
            nextStep();
          }}
        >Next</button>
            </div>
          </form>
        </>
      )}

      {step === 5 && (
  <>
    <h3>Plant Configuration Inputs</h3>
    <form className="signup-form">
      {/* Character-only fields */}
      <input name="scadaVendor" placeholder="SCADA/Datalogger Vendor"
        value={formData.scadaVendor || ""}
        onChange={handleCharChange} required
      />
      <input name="scadaModel" placeholder="SCADA/Datalogger Model"
        value={formData.scadaModel || ""}
        onChange={handleCharChange} required
      />
      <input name="protocol" placeholder="Communication Protocol (Modbus TCP/RTU, IEC-104, MQTT, etc.)"
        value={formData.protocol || ""}
        onChange={handleCharChange} required
      />
      <input name="pollingInterval" placeholder="Data Polling Interval (e.g., 1 min / 5 min / 15 min)"
        value={formData.pollingInterval || ""}
        onChange={handleNumericChange} required
      />
      <input name="pushMethod" placeholder="Data Push Method (API/SFTP/Manual Upload)"
        value={formData.pushMethod || ""}
        onChange={handleCharChange} required
      />
      <input name="ntpConfigured" placeholder="Site Time Synchronization (NTP configured? Yes/No)"
        value={formData.ntpConfigured || ""}
        onChange={handleCharChange} required
      />
      <input name="inverterMapping" placeholder="Inverter Mapping File Available? (Yes/No)"
        value={formData.inverterMapping || ""}
        onChange={handleCharChange} required
      />
      <input name="meterDetails" placeholder="Meter Details (Make/Model/Serial No.)"
        value={formData.meterDetails || ""}
        onChange={handleCharChange} required
      />
      <input name="weatherStation" placeholder="Weather Station Available? (Yes/No)"
        value={formData.weatherStation || ""}
        onChange={handleCharChange} required
      />
      <input name="sensorList" placeholder="Sensor List (Irradiance, Module Temp, Ambient Temp, Wind, etc.)"
        value={formData.sensorList || ""}
        onChange={handleCharChange} required
      />
      <input name="alarmCodes" placeholder="Alarm/Fault Code List Available? (Yes/No)"
        value={formData.alarmCodes || ""}
        onChange={handleCharChange} required
      />
      <input name="sldAvailable" placeholder="Single-Line Diagram (SLD) Available? (Yes/No)"
        value={formData.sldAvailable || ""}
        onChange={handleCharChange} required
      />
      <input name="networkDiagram" placeholder="Network Diagram Available? (Yes/No)"
        value={formData.networkDiagram || ""}
        onChange={handleCharChange} required
      />
      <input name="backfillRequired" placeholder="Historical Data Required for Backfill? (Yes/No)"
        value={formData.backfillRequired || ""}
        onChange={handleCharChange} required
      />
      <label htmlFor="monitoringStartDate">Backfill Start Date:</label>
      <input type="date" name="backfillStartDate" placeholder="Backfill Start Date (if yes)"
        value={formData.backfillStartDate || ""}
        onChange={handleChange} required
      />
      <input name="apiIntegration" placeholder="API Integration Required? (Yes/No)"
        value={formData.apiIntegration || ""}
        onChange={handleCharChange} required
      />
      <input name="apiEndpoint" placeholder="API Endpoint/Documentation Link"
        value={formData.apiEndpoint || ""}
        onChange={handleChange} required
      />
      <input name="vpnRequired" placeholder="VPN or Secure Tunnel Required? (Yes/No)"
        value={formData.vpnRequired || ""}
        onChange={handleCharChange} required
      />
      <input name="staticIp" placeholder="Site Static Public IP (if applicable)"
        value={formData.staticIp || ""}
        onChange={handleChange} required
      />

      <div className="button-row">
        <button type="button" onClick={prevStep}>Back</button>
        <button
          type="button"
          onClick={() => {
            if (
              !formData.scadaVendor ||
              !formData.scadaModel ||
              !formData.protocol ||
              !formData.pollingInterval ||
              !formData.pushMethod ||
              !formData.ntpConfigured ||
              !formData.inverterMapping ||
              !formData.meterDetails ||
              !formData.weatherStation ||
              !formData.sensorList ||
              !formData.alarmCodes ||
              !formData.sldAvailable ||
              !formData.networkDiagram ||
              !formData.backfillRequired ||
              !formData.backfillStartDate ||
              !formData.apiIntegration ||
              !formData.apiEndpoint ||
              !formData.vpnRequired ||
              !formData.staticIp
            ) {
              alert("Please fill all required fields in Step 5");
              return;
            }
            nextStep();
          }}
        >
          Next
        </button>
      </div>
    </form>
  </>
)}


{step === 6 && (
  <>
    <h3>Access Requirements</h3>
    <form className="signup-form">
      <input name="numUsers" placeholder="Number of User Accounts Required"
        value={formData.numUsers || ""}
        onChange={handleNumericChange} required
      />
      <input name="roles" placeholder="Roles Needed (Admin/Operator/Viewer)"
        value={formData.roles || ""}
        onChange={handleCharChange} required
      />
      <input name="usernameFormat" placeholder="Preferred Username Format"
        value={formData.usernameFormat || ""}
        onChange={handleCharChange} required
      />
      <input name="ipWhitelisting" placeholder="IP Whitelisting Required? (Yes/No)"
        value={formData.ipWhitelisting || ""}
        onChange={handleCharChange} required
      />
      <input name="ssoRequired" placeholder="Single Sign-On (SSO) Required? (Yes/No)"
        value={formData.ssoRequired || ""}
        onChange={handleCharChange} required
      />

      <div className="button-row">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={() => {
            if (
              !formData.numUsers ||
              !formData.roles ||
              !formData.usernameFormat ||
              !formData.ipWhitelisting ||
              !formData.ssoRequired
            ) {
              alert("Please fill all required fields");
              return;
            }
            nextStep();
          }}
        >Next</button>
      </div>
    </form>
  </>
)}


{step === 7 && (
  <>
    <h3>Billing/Commercial Details</h3>
    <form className="signup-form">
      <input name="billingName" placeholder="Billing Contact Name"
        value={formData.billingName || ""}
        onChange={handleCharChange} required
      />
      <input name="billingEmail" placeholder="Billing Email"
        value={formData.billingEmail || ""}
        onChange={handleChange} required
      />
      <input name="purchaseOrder" placeholder="Purchase Order/Contract Reference"
        value={formData.purchaseOrder || ""}
        onChange={handleNumericChange} required
      />

      <div className="button-row">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={() => {
    if (!formData.billingName || !formData.billingEmail || !formData.purchaseOrder) {
      alert("Please fill all required fields");
      return;
    }
    nextStep();
  }}
>Next</button>
      </div>
    </form>
  </>
)}
{step === 8 && (
  <>
    <h3>Account Creation Details</h3>
    <form className="signup-form">
      <input
        name="accountStatus"
        placeholder="Account Creation Status (Pending/Completed)"
        value={formData.accountStatus || ""}
        onChange={handleCharChange}
        required
      />
      <input
        name="portalUrl"
        placeholder="Portal URL"
        value={formData.portalUrl || ""}
        onChange={handleChange}
        required
      />
      <input
        name="clientId"
        placeholder="Client ID"
        value={formData.clientId || ""}
        onChange={handleChange}
        required
      />

      <h3>Admin Login Credentials</h3>
      <input
        name="adminUsername"
        placeholder="Username"
        value={formData.adminUsername || ""}
        onChange={handleCharChange}
        required
      />
      <input
        type="password"
        name="adminPassword"
        placeholder="Password"
        value={formData.adminPassword || ""}
        onChange={handleChange}
        required
      />

      {/* <h3>Notes</h3>
      <textarea
        name="notes"
        placeholder="Client must change password at first login. Enable 2FA after first login (recommended). Credentials are shared only with authorized client contacts."
        value={formData.notes || ""}
        onChange={handleChange}
        rows={3}
      /> */}

      <h3>Audit Info</h3>
      <label htmlFor="monitoringStartDate">Date Created:</label>
      <input
        type="date"
        name="dateCreated"
        placeholder="Date Created"
        value={formData.dateCreated || ""}
        onChange={handleChange}
        required
      />
      <input
        name="createdBy"
        placeholder="Created By"
        value={formData.createdBy || ""}
        onChange={handleCharChange}
        required
      />

      <div className="button-row">
        <button type="button" onClick={prevStep}>Back</button>
        <button
          type="button"
          onClick={() => {
            if (
              !formData.accountStatus ||
              !formData.portalUrl ||
              !formData.clientId ||
              !formData.adminUsername ||
              !formData.adminPassword ||
              !formData.dateCreated ||
              !formData.createdBy
            ) {
              alert("Please fill all required fields");
              return;
            }
            handleSubmit();
          }}
        >
          Finish
        </button>
      </div>
    </form>
  </>
)}


</div>
  );
}