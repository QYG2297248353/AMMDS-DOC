---
sidebar_position: 1
sidebar_label: "M-Team"
---

# M-Team

M-Team is a comprehensive discussion forum with diverse discussion sections and combined groups, providing discussion on current affairs and information worldwide.

:::info Private Site Note
This site requires registration by invitation and has certain thresholds.
:::

<!-- truncate -->

## Plugin Configuration

![Plugin Configuration](/img/plugin/m-team-01.png)

### Basic Configuration

- **Enable Status**：Controls whether to enable the M-Team plugin.
- **Service Address**：M-Team API server address. The default value is `https://api.m-team.io/api`, which can be modified according to actual conditions.
  
  Currently, there are three M-Team API server addresses:
  - https://api.m-team.cc/api
  - https://api.m-team.io/api
  - https://api2.m-team.cc/api
- **Passkey**：Key used for authentication, which can be obtained by clicking the "Send to Email" button in "Console >> Settings >> Home >> Passkey" and checking the result in the email. The default value is empty.
- **Access Token**：Token used for API access, which can be created by clicking the "Create Access Token" button in "Console >> Settings >> Laboratory >> Access Token". The default value is empty.

![Access Token](/img/plugin/m-team-02.png)

- **Account Protection Notification**：If the account has not logged in again for more than 14 days, the system will send a notification reminder, requiring re-login to protect the account from being deleted.