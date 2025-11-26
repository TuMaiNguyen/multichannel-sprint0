```mermaid
erDiagram
  CHANNEL {
    uuid id PK
    varchar name
  }

  POST {
    uuid id PK
    varchar title
    text body
    varchar channel
    datetime scheduleAt
    varchar status
    datetime createdAt
  }

  FEEDBACK {
    uuid id PK
    varchar name
    text message
    datetime createdAt
  }

  INBOXMESSAGE {
    uuid id PK
    varchar sender
    text message
    datetime createdAt
  }

  KPI {
    uuid id PK
    varchar metric
    numeric value
    datetime capturedAt
  }

  CHANNEL ||--o{ POST : has
