function RightSidebar() {
  return (
    <div className="rightSidebar">
      <h3>Top Recruiters</h3>

      <div className="recruiterList">

        {/* CS / IT */}
        <div className="branchGroup">
          <h4>CS / IT</h4>
          <ul>
            <li>
              <a href="https://careers.google.com" target="_blank" rel="noopener noreferrer">
                Google
              </a>
            </li>
            <li>
              <a href="https://careers.microsoft.com" target="_blank" rel="noopener noreferrer">
                Microsoft
              </a>
            </li>
            <li>
              <a href="https://careers.jpmorgan.com" target="_blank" rel="noopener noreferrer">
                JP Morgan
              </a>
            </li>
            <li>
              <a href="https://www.oracle.com/careers/" target="_blank" rel="noopener noreferrer">
                Oracle
              </a>
            </li>
          </ul>
        </div>

        {/* EXTC / EC / EE */}
        <div className="branchGroup">
          <h4>EXTC / EC / EE</h4>
          <ul>
            <li>
              <a href="https://www.qualcomm.com/company/careers" target="_blank" rel="noopener noreferrer">
                Qualcomm
              </a>
            </li>
            <li>
              <a href="https://careers.ti.com/" target="_blank" rel="noopener noreferrer">
                Texas Instruments
              </a>
            </li>
            <li>
              <a href="https://www.samsung.com/in/about-us/careers/" target="_blank" rel="noopener noreferrer">
                Samsung R&D
              </a>
            </li>
          </ul>
        </div>

        {/* PROD / MECH */}
        <div className="branchGroup">
          <h4>PROD / MECH</h4>
          <ul>
            <li>
              <a href="https://www.tatamotors.com/careers/" target="_blank" rel="noopener noreferrer">
                Tata Motors
              </a>
            </li>
            <li>
              <a href="https://www.mahindra.com/careers" target="_blank" rel="noopener noreferrer">
                Mahindra
              </a>
            </li>
            <li>
              <a href="https://www.larsentoubro.com/corporate/careers/" target="_blank" rel="noopener noreferrer">
                L&T
              </a>
            </li>
          </ul>
        </div>

        {/* CIVIL */}
        <div className="branchGroup">
          <h4>CIVIL</h4>
          <ul>
            <li>
              <a href="https://www.larsentoubro.com/" target="_blank" rel="noopener noreferrer">
                L&T Construction
              </a>
            </li>
            <li>
              <a href="https://www.afcons.com/careers/" target="_blank" rel="noopener noreferrer">
                Afcons
              </a>
            </li>
          </ul>
        </div>

        {/* TEXTILE */}
        <div className="branchGroup">
          <h4>TEXTILE</h4>
          <ul>
            <li>
              <a href="https://www.raymond.in/careers/" target="_blank" rel="noopener noreferrer">
                Raymond
              </a>
            </li>
            <li>
              <a href="https://www.arvind.com/careers/" target="_blank" rel="noopener noreferrer">
                Arvind Mills
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default RightSidebar;


