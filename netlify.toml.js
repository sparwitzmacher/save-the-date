    [functions]
      directory = "netlify/functions"

    [[kv_namespaces]]
      name = "MY_STORE"
      binding = "MY_STORE"

    [[scheduled_functions]]
      function = "weekly-report"
      cron = "0 9 * * 1"  # Montag 09:00 UTC

