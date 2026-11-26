const UserNotRegisteredError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-destructive mb-4">Account Not Registered</h1>
        <p className="text-muted-foreground mb-6">
          Your account is not registered. Please contact support or register first.
        </p>
      </div>
    </div>
  )
}

export default UserNotRegisteredError