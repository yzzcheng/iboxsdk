package com.iboxsdk.abstracts;

@FunctionalInterface
public interface Action<T> {
    void Action(T data);
}
