```mermaid
erDiagram
    USER {
        int user_id PK
        string full_name
        string email
        string role
        string password_hash
        datetime created_at
    }

    CHANNEL {
        int channel_id PK
        string name
        string code
        string description
        boolean is_active
    }

    POST {
        int post_id PK
        int channel_id FK
        int author_id FK
        string title
        text content
        string status
        datetime scheduled_at
        datetime published_at
        datetime created_at
        datetime updated_at
    }

    WEBHOOK_EVENT {
        int event_id PK
        string external_event_id
        int channel_id FK
        int post_id FK
        string event_type
        text payload_json
        datetime received_at
    }

    FEEDBACK {
        int feedback_id PK
        string customer_name
        text message
        datetime created_at
    }

    BRANCH {
        int branch_id PK
        string name
        string address
        string phone
        string open_hours
        boolean is_active
    }

    USER ||--o{ POST : "writes"
    CHANNEL ||--o{ POST : "has"
    CHANNEL ||--o{ WEBHOOK_EVENT : "generates"
    POST ||--o{ WEBHOOK_EVENT : "relates to"
