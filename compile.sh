docker build -t blueapp/user:0.0.2 . &&
kubectl scale --replicas=0 deployment deployment --namespace=user &&
kubectl scale --replicas=2 deployment deployment --namespace=user
